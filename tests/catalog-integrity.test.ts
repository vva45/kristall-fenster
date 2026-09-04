import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";
import { CATALOGUE_MODELS } from "../src/data/catalog/catalogue-models";
import { CATALOGUES } from "../src/data/catalog/catalogues";
import { CATEGORIES } from "../src/data/catalog/categories";
import { MANUFACTURERS } from "../src/data/catalog/manufacturers";

const publicPath = (path: string) => join(process.cwd(), "public", path.replace(/^\//, ""));

const assertUnique = (values: string[], label: string) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  assert.deepEqual([...new Set(duplicates)], [], `${label} duplicados: ${duplicates.join(", ")}`);
};

describe("integridad del catálogo", () => {
  test("mantiene únicos los slugs e identificadores", () => {
    assertUnique(CATEGORIES.map((category) => category.slug), "slugs de categoría");
    assertUnique(CATALOGUES.map((catalogue) => catalogue.id), "ids de catálogo");
    assertUnique(
      MANUFACTURERS.map((manufacturer) => `${manufacturer.category}/${manufacturer.id}`),
      "ids de fabricante por categoría",
    );
    assertUnique(
      MANUFACTURERS.flatMap((manufacturer) =>
        manufacturer.systems.map((system) => `${manufacturer.id}/${system.id}`),
      ),
      "ids de sistema por fabricante",
    );
    assertUnique(
      CATALOGUE_MODELS.map((model) => `${model.catalogue}/${model.id}`),
      "ids de modelo por catálogo",
    );
  });

  test("solo referencia categorías y catálogos existentes", () => {
    const categories = new Set(CATEGORIES.map((category) => category.slug));
    const catalogues = new Set(CATALOGUES.map((catalogue) => catalogue.id));

    for (const category of CATEGORIES) {
      if (category.parent) assert.ok(categories.has(category.parent), `Padre inexistente: ${category.parent}`);
    }
    for (const manufacturer of MANUFACTURERS) {
      assert.ok(categories.has(manufacturer.category), `Categoría inexistente: ${manufacturer.category}`);
    }
    for (const catalogue of CATALOGUES) {
      if (catalogue.category) assert.ok(categories.has(catalogue.category), `Categoría inexistente: ${catalogue.category}`);
    }
    for (const model of CATALOGUE_MODELS) {
      assert.ok(catalogues.has(model.catalogue), `Catálogo inexistente: ${model.catalogue}`);
      if (model.category) assert.ok(categories.has(model.category), `Categoría inexistente: ${model.category}`);
    }
  });

  test("Pergolas está publicada con sus dos sistemas Kamika", () => {
    const pergolas = CATEGORIES.find((category) => category.slug === "pergolas");
    const kamika = MANUFACTURERS.find(
      (manufacturer) => manufacturer.category === "pergolas" && manufacturer.id === "kamika",
    );

    assert.ok(pergolas);
    assert.equal(pergolas.comingSoon, undefined);
    assert.ok(kamika);
    assert.deepEqual(kamika.systems.map((system) => system.id), ["bioclimatic", "glass-roof"]);
  });

  test("todas las imágenes publicadas existen", async () => {
    const images = [
      ...CATEGORIES.map((category) => category.heroImage),
      ...CATALOGUES.map((catalogue) => catalogue.cover),
      ...MANUFACTURERS.flatMap((manufacturer) => [
        manufacturer.image,
        ...manufacturer.systems.map((system) => system.image),
      ]),
      ...CATALOGUE_MODELS.map((model) => model.image),
    ];

    await Promise.all(images.map((image) => access(publicPath(image))));
  });

  test("las páginas de modelo caben en el catálogo declarado", () => {
    const pagesByCatalogue = new Map(CATALOGUES.map((catalogue) => [catalogue.id, catalogue.pages]));
    for (const model of CATALOGUE_MODELS) {
      const pages = pagesByCatalogue.get(model.catalogue);
      assert.ok(model.page > 0, `Página inválida: ${model.catalogue}/${model.id}`);
      if (pages) assert.ok(model.page <= pages, `Página fuera del catálogo: ${model.catalogue}/${model.id}`);
    }
  });

  test("cada catálogo conserva una ruta PDF única y metadatos publicables", () => {
    assertUnique(CATALOGUES.map((catalogue) => catalogue.file), "rutas PDF");
    for (const catalogue of CATALOGUES) {
      assert.match(catalogue.file, /^\/pdf\/catalogues\/[a-z0-9-]+\.pdf$/);
      assert.ok((catalogue.pages ?? 0) > 0, `Faltan páginas: ${catalogue.id}`);
      assert.ok((catalogue.sizeMb ?? 0) > 0, `Falta tamaño: ${catalogue.id}`);
      assert.ok((catalogue.year ?? 0) >= 2000, `Falta edición: ${catalogue.id}`);
    }
  });
});
