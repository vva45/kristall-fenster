import type { Locale } from "./i18n";

export const MAX_ATTACHMENT_FILES = 5;
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS_BYTES = 15 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type InquiryErrorCode =
  | "rate_limited"
  | "invalid_form"
  | "required_fields"
  | "invalid_attachments"
  | "email_not_configured"
  | "email_failed";

export function validateAttachments(files: File[]): InquiryErrorCode | null {
  if (
    files.length > MAX_ATTACHMENT_FILES ||
    files.some(
      (file) =>
        file.size > MAX_ATTACHMENT_BYTES || !ALLOWED_ATTACHMENT_TYPES.has(file.type),
    ) ||
    files.reduce((total, file) => total + file.size, 0) > MAX_ATTACHMENTS_BYTES
  ) {
    return "invalid_attachments";
  }
  return null;
}

export function parseLocale(value: FormDataEntryValue | null): Locale {
  return value === "en" || value === "pl" ? value : "de";
}
