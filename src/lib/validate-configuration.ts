import { COLORS } from "../data/configurator/colors";
import { LIMITS } from "../data/configurator/options";
import { SYSTEMS } from "../data/configurator/systems";
import type { WindowConfig } from "../data/configurator/types";

export type ConfigurationIssueCode =
  | "invalid_dimensions"
  | "invalid_quantity"
  | "invalid_system"
  | "invalid_colour"
  | "invalid_leaf_count"
  | "invalid_shutter_size"
  | "fixed_hardware"
  | "shutter_options_without_shutter"
  | "muntin_divisions_without_muntins"
  | "large_element"
  | "special_glass"
  | "security_package"
  | "roller_shutter"
  | "special_request";

export interface ConfigurationIssue {
  code: ConfigurationIssueCode;
  field: keyof WindowConfig;
}

export interface ConfigurationValidation {
  valid: boolean;
  errors: ConfigurationIssue[];
  warnings: ConfigurationIssue[];
  requiresTechnicalReview: boolean;
}

const fixed = (opening: WindowConfig["leafOpenings"][number]) =>
  opening === "fixed" || opening === "fixedSash";

/** Pure, shared validation. It never silently repairs customer input. */
export function validateConfiguration(config: WindowConfig): ConfigurationValidation {
  const errors: ConfigurationIssue[] = [];
  const warnings: ConfigurationIssue[] = [];
  const addError = (code: ConfigurationIssueCode, field: keyof WindowConfig) => errors.push({ code, field });
  const addWarning = (code: ConfigurationIssueCode, field: keyof WindowConfig) => warnings.push({ code, field });
  const system = SYSTEMS.find(({ id }) => id === config.systemId);
  const expectedLeaves = config.sash === "one" ? 1 : config.sash === "three" ? 3 : 2;

  if (!Number.isFinite(config.widthMm) || !Number.isFinite(config.heightMm) ||
      config.widthMm < LIMITS.minWidth || config.widthMm > LIMITS.maxWidth ||
      config.heightMm < LIMITS.minHeight || config.heightMm > LIMITS.maxHeight) {
    addError("invalid_dimensions", "widthMm");
  }
  if (!Number.isInteger(config.quantity) || config.quantity < 1 || config.quantity > LIMITS.maxQuantity) {
    addError("invalid_quantity", "quantity");
  }
  if (!system || system.material !== config.material || system.configurable === false) addError("invalid_system", "systemId");
  if ([config.exteriorColorId, config.interiorColorId].some((id) =>
    !COLORS.some((colour) => colour.id === id && colour.materials.includes(config.material)))) {
    addError("invalid_colour", "exteriorColorId");
  }
  if (config.leafOpenings.length !== expectedLeaves) addError("invalid_leaf_count", "leafOpenings");
  if (config.shutter !== "none" && (config.widthMm < LIMITS.shutter.minWidth ||
      config.heightMm < LIMITS.shutter.minHeight || config.widthMm > LIMITS.shutter.maxWidth ||
      config.heightMm > LIMITS.shutter.maxHeight)) addError("invalid_shutter_size", "shutter");
  if (config.leafOpenings.every(fixed) && (config.handle !== "standard" || config.security !== "base" ||
      config.extras.some((extra) => extra !== "trickleVent"))) addError("fixed_hardware", "leafOpenings");
  if (config.shutter === "none" && (config.shutterControl !== "belt" || config.mosquito)) {
    addError("shutter_options_without_shutter", "shutter");
  }
  if (config.muntin === "none" && (config.muntinVertical !== 1 || config.muntinHorizontal !== 1)) {
    addError("muntin_divisions_without_muntins", "muntin");
  }

  if (config.widthMm * config.heightMm > 4_000_000) addWarning("large_element", "widthMm");
  if (config.soundGlass !== "standard" || config.safetyGlass !== "standard" ||
      config.ornamentGlassId !== "none") addWarning("special_glass", "glazing");
  if (config.security !== "base") addWarning("security_package", "security");
  if (config.shutter !== "none") addWarning("roller_shutter", "shutter");
  if (config.notes.trim()) addWarning("special_request", "notes");

  return { valid: errors.length === 0, errors, warnings, requiresTechnicalReview: warnings.length > 0 };
}
