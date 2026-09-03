import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENT_FILES,
  validateAttachments,
} from "../src/lib/inquiry";

test("acepta adjuntos válidos dentro de los límites", () => {
  const files = [new File(["photo"], "window.jpg", { type: "image/jpeg" })];
  assert.equal(validateAttachments(files), null);
});

test("rechaza tipo, tamaño y cantidad de adjuntos inválidos", () => {
  assert.equal(
    validateAttachments([new File(["svg"], "drawing.svg", { type: "image/svg+xml" })]),
    "invalid_attachments",
  );
  assert.equal(
    validateAttachments([
      new File([new Uint8Array(MAX_ATTACHMENT_BYTES + 1)], "large.pdf", {
        type: "application/pdf",
      }),
    ]),
    "invalid_attachments",
  );
  assert.equal(
    validateAttachments(
      Array.from(
        { length: MAX_ATTACHMENT_FILES + 1 },
        (_, index) => new File(["x"], `${index}.png`, { type: "image/png" }),
      ),
    ),
    "invalid_attachments",
  );
});
