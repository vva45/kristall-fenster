/**
 * Helpers de servidor para el catálogo del laboratorio.
 *
 * Los datos son copias literales de kamika-bauelemente
 * (src/data/catalog/). El laboratorio pinta el catálogo solo en
 * alemán — el idioma del mercado y el por defecto de Kamika; la
 * versión trilingüe ya existe en la web principal, que es adonde se
 * mudará el configurador.
 */
import { CATALOGUE_MODELS } from "../data/catalog/catalogue-models";
import { CATALOGUES, getCatalogue } from "../data/catalog/catalogues";
import { CATEGORIES } from "../data/catalog/categories";
import { MANUFACTURERS } from "../data/catalog/manufacturers";
import type {
  Catalogue,
  CatalogueModel,
  Category,
  CategorySlug,
  Localized,
  Manufacturer,
} from "../data/catalog/types";

/** Alemán con caída al inglés — la misma regla `pick` de Kamika. */
export const de = <T,>(v: Localized<T>): T => v.de ?? v.en;

export const categoriesOrdered = (): Category[] =>
  [...CATEGORIES].sort((a, b) => a.order - b.order);

export const categoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

export const manufacturersFor = (slug: CategorySlug): Manufacturer[] =>
  MANUFACTURERS.filter((m) => m.category === slug);

/** Gama efectiva de un modelo: la suya propia o la de su catálogo. */
const modelCategory = (model: CatalogueModel): CategorySlug | undefined =>
  model.category ?? getCatalogue(model.catalogue)?.category;

/** Modelos de una gama, agrupados por colección (catálogo), en orden. */
export const modelsByCollection = (
  slug: CategorySlug,
): { catalogue: Catalogue; models: CatalogueModel[] }[] => {
  const groups: { catalogue: Catalogue; models: CatalogueModel[] }[] = [];
  for (const catalogue of CATALOGUES) {
    const models = CATALOGUE_MODELS.filter(
      (m) => m.catalogue === catalogue.id && modelCategory(m) === slug,
    );
    if (models.length > 0) groups.push({ catalogue, models });
  }
  return groups;
};

export const modelCountFor = (slug: CategorySlug): number =>
  CATALOGUE_MODELS.filter((m) => modelCategory(m) === slug).length;
