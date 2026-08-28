"use client";

/**
 * El configurador entero, en React de verdad: un solo árbol de estado
 * (useReducer) del que cuelgan los ocho pasos, la vista previa SVG,
 * el desglose de precio y la lista de presupuesto. Sustituye al
 * prototipo de script-que-manipula-el-DOM.
 *
 * Los PRECIOS son de ejemplo (data/configurator/pricing.ts) y la
 * interfaz lo dice en un aviso permanente — regla de la casa: nada
 * de números fingiendo ser reales.
 */
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  EXTRAS,
  GASKETS,
  GLAZINGS,
  LEAF_OPENINGS,
  HANDLES,
  LIMITS,
  MATERIAL_LABEL,
  MUNTINS,
  ORNAMENT_GLASSES,
  SASH_LAYOUTS,
  SECURITY,
  SHUTTERS,
  SHUTTER_CONTROLS,
  SAFETY_GLASS,
  SOUND_GLASS,
} from "../../data/configurator/options";
import { brandsForMaterial, systemsForBrand } from "../../data/configurator/systems";
import type {
  ExtraId,
  LeafOpening,
  Localized,
  QuoteItem,
  SashLayout,
  WindowConfig,
} from "../../data/configurator/types";
import { calculateQuote, colorById } from "../../lib/calculateQuote";
import { formatEuro, formatNumber, pick, useLocale, LOCALES, type Locale } from "../../lib/i18n";
import {
  colourGroupsFor,
  DEFAULT_CONFIG,
  fixedOnly,
  leafNameFor,
  reducer,
  shutterAvailable,
  systemById,
} from "./state";
import { S } from "./strings";
import { WindowPreview } from "./WindowPreview";

const QUOTE_STORAGE_KEY = "kamika-configurator-quote-v1";

type StepKey =
  | "system"
  | "type"
  | "size"
  | "colour"
  | "glass"
  | "muntins"
  | "shutter"
  | "extras";

const STEPS: { key: StepKey; label: Localized<string> }[] = [
  { key: "system", label: S.stepSystem },
  { key: "type", label: S.stepType },
  { key: "size", label: S.stepSize },
  { key: "colour", label: S.stepColour },
  { key: "glass", label: S.stepGlass },
  { key: "muntins", label: S.stepMuntins },
  { key: "shutter", label: S.stepShutter },
  { key: "extras", label: S.stepExtras },
];

/* ── Átomos de interfaz ─────────────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="kamika-eyebrow mt-6 mb-2 first:mt-0">{children}</p>;
}

function ChoiceButton({
  selected,
  disabled,
  onClick,
  title,
  note,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  note?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={
        "rounded-kamika border px-3 py-2.5 text-left transition-colors " +
        (selected
          ? "border-kamika-steel bg-kamika-blue-50 ring-1 ring-kamika-steel"
          : "border-kamika-mist bg-kamika-paper hover:border-kamika-steel/50") +
        (disabled ? " cursor-not-allowed opacity-40" : "")
      }
    >
      <span className="block text-[0.9rem] font-medium text-kamika-ink">{title}</span>
      {note && <span className="mt-0.5 block text-[0.78rem] text-kamika-ink/60">{note}</span>}
    </button>
  );
}

/**
 * Campo numérico con borrador local: se puede teclear con calma y el
 * valor se aplica al salir del campo o con Enter (si se aplicara
 * tecla a tecla, "15" camino de "1500" se clavaría en el mínimo).
 */
function NumberField({
  label,
  value,
  min,
  max,
  step,
  onCommit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setDraft(String(value));
  }, [value]);
  const commit = () => {
    focused.current = false;
    const parsed = Number(draft);
    onCommit(Number.isFinite(parsed) ? parsed : value);
    setDraft(String(value));
  };
  return (
    <label className="block">
      <span className="mb-1 block text-[0.8rem] font-medium text-kamika-ink/70">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={draft}
        onFocus={() => (focused.current = true)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 font-mono text-[0.95rem] text-kamika-ink"
      />
    </label>
  );
}

/* ── El configurador ────────────────────────────────────────────── */

export function ConfiguratorApp() {
  const { locale, setLocale } = useLocale();
  const [config, dispatch] = useReducer(reducer, DEFAULT_CONFIG);
  const [step, setStep] = useState<StepKey>("system");
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [quoteReady, setQuoteReady] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "ok" | "fail">("idle");

  const t = <T,>(v: Localized<T>) => pick(v, locale);

  // La lista guardada se carga tras montar (evita desajustes de
  // hidratación y aguanta almacenamiento bloqueado).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
      if (raw) setQuote(JSON.parse(raw) as QuoteItem[]);
    } catch {
      /* sin lista guardada */
    }
    setQuoteReady(true);
  }, []);
  useEffect(() => {
    if (!quoteReady) return;
    try {
      window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quote));
    } catch {
      /* sin persistencia */
    }
  }, [quote, quoteReady]);

  const system = systemById(config.systemId);
  const exterior = colorById(config.exteriorColorId);
  const interior = colorById(config.interiorColorId);
  const breakdown = useMemo(() => calculateQuote(config), [config]);
  const colourGroups = useMemo(() => colourGroupsFor(config.material), [config.material]);
  const canShutter = shutterAvailable(config);
  const allFixed = fixedOnly(config);

  const openingSummary = config.leafOpenings
    .map((o) => t(LEAF_OPENINGS[o]))
    .join(" · ");

  const summaryLines = () => [
    `${t(S.quoteItem)} — ${config.widthMm} × ${config.heightMm} mm`,
    `${t(S.material)}: ${t(MATERIAL_LABEL[config.material])}`,
    `${t(S.system)}: ${system.brand} ${system.name}`,
    `${t(S.metaType)}: ${t(SASH_LAYOUTS[config.sash].label)}`,
    `${t(S.metaOpening)}: ${openingSummary}`,
    `${t(S.exteriorColour)}: ${t(exterior.name)} (${exterior.code})`,
    `${t(S.interiorColour)}: ${t(interior.name)} (${interior.code})`,
    `${t(S.glazing)}: ${t(GLAZINGS[config.glazing].label)}`,
    `${t(S.shutterType)}: ${t(SHUTTERS[config.shutter].label)}`,
    `${t(S.quantity)}: ${config.quantity}`,
    `${t(S.totalLabel)}: ${formatEuro(breakdown.total, locale)} (${t(S.demoPrices)})`,
  ];

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryLines().join("\n"));
      setCopyState("ok");
    } catch {
      setCopyState("fail");
    }
    window.setTimeout(() => setCopyState("idle"), 1500);
  };

  const addToQuote = () => {
    setQuote((prev) => [
      ...prev,
      {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        config,
        unitPrice: breakdown.unitPrice,
        total: breakdown.total,
        addedAt: Date.now(),
      },
    ]);
  };

  const quoteTotal = quote.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
      {/* Cabecera */}
      <header className="flex flex-wrap items-end justify-between gap-4 pt-10 pb-6 md:pt-14">
        <div className="max-w-2xl">
          <p className="kamika-eyebrow">{t(S.eyebrow)}</p>
          <h1 className="mt-2 text-3xl md:text-4xl">{t(S.title)}</h1>
          <p className="mt-3 text-kamika-ink/70">{t(S.intro)}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Selector de idioma del laboratorio */}
          <div className="flex overflow-hidden rounded-kamika border border-kamika-mist" role="group" aria-label="Language">
            {LOCALES.map((l: Locale) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={
                  "px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase transition-colors " +
                  (locale === l
                    ? "bg-kamika-ink text-kamika-paper"
                    : "bg-kamika-paper text-kamika-ink/60 hover:text-kamika-ink")
                }
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Aviso permanente: precios de ejemplo. */}
      <p className="mb-8 inline-block rounded-kamika border border-amber-300 bg-amber-50 px-3 py-1.5 text-[0.8rem] font-medium text-amber-900">
        ⚠︎ {t(S.demoPrices)}
      </p>

      <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_1fr]">
        {/* ── Vista previa ─────────────────────────────────────── */}
        <section
          aria-label={t(S.preview)}
          className="kamika-grid-bg min-w-0 rounded-kamika border border-kamika-mist p-5 md:p-7 lg:sticky lg:top-6"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="kamika-eyebrow">{t(S.preview)}</p>
            <p className="rounded-kamika bg-kamika-ink px-3 py-1.5 font-mono text-sm text-kamika-paper" aria-live="polite">
              {formatEuro(breakdown.total, locale)}
            </p>
          </div>
          <div className="mt-4">
            <WindowPreview config={config} exterior={exterior} interior={interior} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-kamika-mist pt-4 text-[0.85rem] md:grid-cols-4">
            <div>
              <dt className="text-kamika-ink/55">{t(S.metaSystem)}</dt>
              <dd className="font-medium">{system.brand} {system.name}</dd>
            </div>
            <div>
              <dt className="text-kamika-ink/55">{t(S.metaType)}</dt>
              <dd className="font-medium">{t(SASH_LAYOUTS[config.sash].label)}</dd>
            </div>
            <div>
              <dt className="text-kamika-ink/55">{t(S.metaSize)}</dt>
              <dd className="font-mono font-medium">{config.widthMm} × {config.heightMm}</dd>
            </div>
            <div>
              <dt className="text-kamika-ink/55">{t(S.metaOpening)}</dt>
              <dd className="font-medium">{openingSummary}</dd>
            </div>
          </dl>
        </section>

        {/* ── Pasos ────────────────────────────────────────────── */}
        {/* min-w-0: sin él, la fila de pestañas (min-content ancho)
            ensancharía la columna del grid y desbordaría en móvil. */}
        <section className="min-w-0 rounded-kamika border border-kamika-mist">
          <div className="flex overflow-x-auto border-b border-kamika-mist" role="tablist">
            {STEPS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={step === key}
                onClick={() => setStep(key)}
                className={
                  "shrink-0 border-b-2 px-3.5 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-colors md:px-4 " +
                  // Activa: chip azul Kamika con texto blanco Y la línea
                  // de abajo — el edit-en-Paint del jefe, tal cual :)
                  (step === key
                    ? "border-kamika-ink bg-kamika-blue-active font-medium text-white"
                    : "border-transparent text-kamika-ink/50 hover:text-kamika-ink")
                }
              >
                {t(label)}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-6">
            {/* 1 · Sistema */}
            {step === "system" && (
              <div>
                <FieldLabel>{t(S.material)}</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["pvc", "aluminium"] as const).map((m) => (
                    <ChoiceButton
                      key={m}
                      selected={config.material === m}
                      onClick={() => dispatch({ type: "setMaterial", material: m })}
                      title={t(MATERIAL_LABEL[m])}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.brand)}</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {brandsForMaterial(config.material).map((brand) => (
                    <ChoiceButton
                      key={brand}
                      selected={system.brand === brand}
                      onClick={() => dispatch({ type: "setBrand", brand })}
                      title={brand}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.system)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {systemsForBrand(config.material, system.brand).map((s) => (
                    <ChoiceButton
                      key={s.id}
                      selected={config.systemId === s.id}
                      onClick={() => dispatch({ type: "patch", patch: { systemId: s.id } })}
                      title={s.name}
                      note={
                        s.depthMm
                          ? `${s.depthMm} mm · Uw ${s.uw ? t(s.uw).split(" (")[0] : "—"}`
                          : s.note
                            ? t(s.note)
                            : undefined
                      }
                    />
                  ))}
                </div>

                {/* Specs del sistema elegido, de su ficha real. */}
                <dl className="mt-6 grid grid-cols-2 gap-3 rounded-kamika bg-kamika-blue-50 p-4 text-[0.85rem] sm:grid-cols-3">
                  <div>
                    <dt className="text-kamika-ink/55">{t(S.specDepth)}</dt>
                    <dd className="font-mono font-medium">{system.depthMm ? `${system.depthMm} mm` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-kamika-ink/55">Uw</dt>
                    <dd className="font-mono font-medium">{system.uw ? t(system.uw) : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-kamika-ink/55">{t(S.specChambers)}</dt>
                    <dd className="font-mono font-medium">{system.chambers ? t(system.chambers) : "—"}</dd>
                  </div>
                  {system.note && (
                    <p className="col-span-full text-[0.8rem] text-kamika-ink/60">{t(system.note)}</p>
                  )}
                </dl>
              </div>
            )}

            {/* 2 · Tipo */}
            {step === "type" && (
              <div>
                <FieldLabel>{t(S.layout)}</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {(Object.keys(SASH_LAYOUTS) as SashLayout[]).map((sash) => (
                    <ChoiceButton
                      key={sash}
                      selected={config.sash === sash}
                      onClick={() => dispatch({ type: "setSash", sash })}
                      title={t(SASH_LAYOUTS[sash].label)}
                      note={t(SASH_LAYOUTS[sash].note)}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.leafFunction)}</FieldLabel>
                <div className="space-y-4">
                  {config.leafOpenings.map((opening, index) => (
                    <div key={index}>
                      <p className="mb-1.5 text-[0.8rem] font-medium text-kamika-ink/70">
                        {t(leafNameFor(config.sash, index))}
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {(Object.keys(LEAF_OPENINGS) as LeafOpening[]).map((o) => (
                          <ChoiceButton
                            key={o}
                            selected={opening === o}
                            onClick={() => dispatch({ type: "setLeafOpening", index, opening: o })}
                            title={t(LEAF_OPENINGS[o])}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3 · Medidas */}
            {step === "size" && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <NumberField
                    label={t(S.width)}
                    value={config.widthMm}
                    min={LIMITS.minWidth}
                    max={LIMITS.maxWidth}
                    step={10}
                    onCommit={(widthMm) => dispatch({ type: "patch", patch: { widthMm } })}
                  />
                  <NumberField
                    label={t(S.height)}
                    value={config.heightMm}
                    min={LIMITS.minHeight}
                    max={LIMITS.maxHeight}
                    step={10}
                    onCommit={(heightMm) => dispatch({ type: "patch", patch: { heightMm } })}
                  />
                </div>
                <p className="mt-2 font-mono text-[0.75rem] text-kamika-ink/55">{t(S.sizeHint)}</p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <NumberField
                    label={t(S.quantity)}
                    value={config.quantity}
                    min={1}
                    max={LIMITS.maxQuantity}
                    step={1}
                    onCommit={(quantity) => dispatch({ type: "patch", patch: { quantity } })}
                  />
                </div>

                <FieldLabel>{t(S.notes)}</FieldLabel>
                <textarea
                  value={config.notes}
                  onChange={(e) => dispatch({ type: "patch", patch: { notes: e.target.value } })}
                  placeholder={t(S.notesPlaceholder)}
                  rows={3}
                  className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 text-[0.9rem]"
                />
              </div>
            )}

            {/* 4 · Color */}
            {step === "colour" && (
              <div>
                {(["exteriorColorId", "interiorColorId"] as const).map((field) => {
                  const current = field === "exteriorColorId" ? exterior : interior;
                  return (
                    <div key={field}>
                      <FieldLabel>
                        {t(field === "exteriorColorId" ? S.exteriorColour : S.interiorColour)}
                      </FieldLabel>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="h-9 w-9 shrink-0 rounded-kamika border border-kamika-mist"
                          style={{ backgroundColor: current.hex }}
                        />
                        <select
                          value={config[field]}
                          onChange={(e) => dispatch({ type: "patch", patch: { [field]: e.target.value } })}
                          className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 text-[0.9rem]"
                        >
                          {colourGroups.map((group) => (
                            <optgroup key={group.key} label={t(group.label)}>
                              {group.colours.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {t(c.name)} ({c.code})
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}

                <FieldLabel>{t(S.gasket)}</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["black", "grey"] as const).map((g) => (
                    <ChoiceButton
                      key={g}
                      selected={config.gasket === g}
                      onClick={() => dispatch({ type: "patch", patch: { gasket: g } })}
                      title={t(GASKETS[g])}
                    />
                  ))}
                </div>

                <p className="mt-5 text-[0.8rem] text-kamika-ink/60">{t(S.colourNote)}</p>
              </div>
            )}

            {/* 5 · Cristal */}
            {step === "glass" && (
              <div>
                <FieldLabel>{t(S.glazing)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {(Object.keys(GLAZINGS) as (keyof typeof GLAZINGS)[]).map((g) => (
                    <ChoiceButton
                      key={g}
                      selected={config.glazing === g}
                      onClick={() => dispatch({ type: "patch", patch: { glazing: g } })}
                      title={t(GLAZINGS[g].label)}
                      note={t(GLAZINGS[g].note)}
                    />
                  ))}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[0.8rem] font-medium text-kamika-ink/70">{t(S.soundGlass)}</span>
                    <select
                      value={config.soundGlass}
                      onChange={(e) => dispatch({ type: "patch", patch: { soundGlass: e.target.value as WindowConfig["soundGlass"] } })}
                      className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 text-[0.9rem]"
                    >
                      {(Object.keys(SOUND_GLASS) as (keyof typeof SOUND_GLASS)[]).map((k) => (
                        <option key={k} value={k}>{t(SOUND_GLASS[k])}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[0.8rem] font-medium text-kamika-ink/70">{t(S.safetyGlass)}</span>
                    <select
                      value={config.safetyGlass}
                      onChange={(e) => dispatch({ type: "patch", patch: { safetyGlass: e.target.value as WindowConfig["safetyGlass"] } })}
                      className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 text-[0.9rem]"
                    >
                      {(Object.keys(SAFETY_GLASS) as (keyof typeof SAFETY_GLASS)[]).map((k) => (
                        <option key={k} value={k}>{t(SAFETY_GLASS[k])}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <FieldLabel>{t(S.ornamentGlass)}</FieldLabel>
                <select
                  value={config.ornamentGlassId}
                  onChange={(e) => dispatch({ type: "patch", patch: { ornamentGlassId: e.target.value } })}
                  className="w-full rounded-kamika border border-kamika-mist bg-kamika-paper px-3 py-2 text-[0.9rem]"
                >
                  <option value="none">{t(S.ornamentNone)}</option>
                  {ORNAMENT_GLASSES.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                <p className="mt-2 text-[0.8rem] text-kamika-ink/60">{t(S.ornamentNote)}</p>
              </div>
            )}

            {/* 6 · Sprossen */}
            {step === "muntins" && (
              <div>
                <FieldLabel>{t(S.muntins)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {(Object.keys(MUNTINS) as (keyof typeof MUNTINS)[]).map((m) => (
                    <ChoiceButton
                      key={m}
                      selected={config.muntin === m}
                      onClick={() => dispatch({ type: "patch", patch: { muntin: m } })}
                      title={t(MUNTINS[m].label)}
                      note={t(MUNTINS[m].note)}
                    />
                  ))}
                </div>
                {config.muntin !== "none" && (
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <NumberField
                      label={t(S.muntinsV)}
                      value={config.muntinVertical}
                      min={0}
                      max={5}
                      step={1}
                      onCommit={(muntinVertical) => dispatch({ type: "patch", patch: { muntinVertical } })}
                    />
                    <NumberField
                      label={t(S.muntinsH)}
                      value={config.muntinHorizontal}
                      min={0}
                      max={5}
                      step={1}
                      onCommit={(muntinHorizontal) => dispatch({ type: "patch", patch: { muntinHorizontal } })}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 7 · Persiana */}
            {step === "shutter" && (
              <div>
                {!canShutter && (
                  <p className="mb-4 rounded-kamika bg-kamika-blue-50 px-3 py-2 text-[0.85rem] text-kamika-ink/70">
                    {t(S.shutterUnavailable)}
                  </p>
                )}
                <FieldLabel>{t(S.shutterType)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {(Object.keys(SHUTTERS) as (keyof typeof SHUTTERS)[]).map((s) => (
                    <ChoiceButton
                      key={s}
                      selected={config.shutter === s}
                      disabled={s !== "none" && !canShutter}
                      onClick={() => dispatch({ type: "patch", patch: { shutter: s } })}
                      title={t(SHUTTERS[s].label)}
                      note={t(SHUTTERS[s].note)}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.shutterControl)}</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {(Object.keys(SHUTTER_CONTROLS) as (keyof typeof SHUTTER_CONTROLS)[]).map((c) => (
                    <ChoiceButton
                      key={c}
                      selected={config.shutterControl === c}
                      disabled={config.shutter === "none"}
                      onClick={() => dispatch({ type: "patch", patch: { shutterControl: c } })}
                      title={t(SHUTTER_CONTROLS[c])}
                    />
                  ))}
                </div>

                <label
                  className={
                    "mt-5 flex items-start gap-3 rounded-kamika border px-3 py-2.5 " +
                    (config.shutter === "none"
                      ? "cursor-not-allowed border-kamika-mist opacity-40"
                      : "cursor-pointer border-kamika-mist hover:border-kamika-steel/50")
                  }
                >
                  <input
                    type="checkbox"
                    checked={config.mosquito}
                    disabled={config.shutter === "none"}
                    onChange={(e) => dispatch({ type: "patch", patch: { mosquito: e.target.checked } })}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-[0.9rem] font-medium">{t(S.mosquito)}</span>
                    <span className="block text-[0.78rem] text-kamika-ink/60">{t(S.mosquitoNote)}</span>
                  </span>
                </label>
              </div>
            )}

            {/* 8 · Extras */}
            {step === "extras" && (
              <div>
                {allFixed && (
                  <p className="mb-4 rounded-kamika bg-kamika-blue-50 px-3 py-2 text-[0.85rem] text-kamika-ink/70">
                    {t(S.fixedOnlyHint)}
                  </p>
                )}
                <FieldLabel>{t(S.handle)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {(Object.keys(HANDLES) as (keyof typeof HANDLES)[]).map((h) => (
                    <ChoiceButton
                      key={h}
                      selected={config.handle === h}
                      disabled={allFixed}
                      onClick={() => dispatch({ type: "patch", patch: { handle: h } })}
                      title={t(HANDLES[h].label)}
                      note={t(HANDLES[h].note)}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.security)}</FieldLabel>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {(Object.keys(SECURITY) as (keyof typeof SECURITY)[]).map((s) => (
                    <ChoiceButton
                      key={s}
                      selected={config.security === s}
                      disabled={allFixed && s !== "base"}
                      onClick={() => dispatch({ type: "patch", patch: { security: s } })}
                      title={t(SECURITY[s].label)}
                      note={t(SECURITY[s].note)}
                    />
                  ))}
                </div>

                <FieldLabel>{t(S.extrasLabel)}</FieldLabel>
                <div className="space-y-2.5">
                  {(Object.keys(EXTRAS) as ExtraId[]).map((extra) => {
                    const disabled = allFixed && extra !== "trickleVent";
                    return (
                      <label
                        key={extra}
                        className={
                          "flex items-start gap-3 rounded-kamika border px-3 py-2.5 " +
                          (disabled
                            ? "cursor-not-allowed border-kamika-mist opacity-40"
                            : "cursor-pointer border-kamika-mist hover:border-kamika-steel/50")
                        }
                      >
                        <input
                          type="checkbox"
                          checked={config.extras.includes(extra)}
                          disabled={disabled}
                          onChange={() => dispatch({ type: "toggleExtra", extra })}
                          className="mt-1"
                        />
                        <span>
                          <span className="block text-[0.9rem] font-medium">{t(EXTRAS[extra].label)}</span>
                          <span className="block text-[0.78rem] text-kamika-ink/60">{t(EXTRAS[extra].note)}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Resumen de precio ──────────────────────────────── */}
          <div className="border-t border-kamika-mist bg-kamika-blue-50/60 p-5 md:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg">{t(S.estimated)}</h2>
              <p className="font-mono text-xl font-medium" aria-live="polite">
                {formatEuro(breakdown.total, locale)}
              </p>
            </div>
            {config.quantity > 1 && (
              <p className="mt-1 text-right font-mono text-[0.78rem] text-kamika-ink/60">
                {formatEuro(breakdown.unitPrice, locale)} {t(S.perUnit)} × {config.quantity}
              </p>
            )}
            <dl className="mt-4 space-y-1.5 border-t border-kamika-mist pt-3 text-[0.85rem]">
              {breakdown.rows
                .filter((row) => row.amount !== 0)
                .map((row) => (
                  <div key={row.key} className="flex justify-between gap-4">
                    <dt className="text-kamika-ink/65">{t(row.label)}</dt>
                    <dd className="font-mono">{formatEuro(row.amount, locale)}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addToQuote}
                className="rounded-kamika bg-kamika-ink px-4 py-2.5 text-[0.9rem] font-medium text-kamika-paper transition-opacity hover:opacity-85"
              >
                {t(S.addToQuote)}
              </button>
              <button
                type="button"
                onClick={copySummary}
                className="rounded-kamika border border-kamika-ink/25 px-4 py-2.5 text-[0.9rem] font-medium transition-colors hover:border-kamika-ink"
              >
                {copyState === "ok" ? t(S.copied) : copyState === "fail" ? t(S.copyFailed) : t(S.copySummary)}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Lista de presupuesto ─────────────────────────────────── */}
      <section aria-label={t(S.quoteTitle)} className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kamika-eyebrow">{t(S.quoteEyebrow)}</p>
            <h2 className="mt-1 text-2xl">{t(S.quoteTitle)}</h2>
          </div>
          {quote.length > 0 && (
            <div className="flex gap-3 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-kamika border border-kamika-ink/25 px-4 py-2 text-[0.85rem] font-medium hover:border-kamika-ink"
              >
                {t(S.print)}
              </button>
              <button
                type="button"
                onClick={() => setQuote([])}
                className="rounded-kamika px-4 py-2 text-[0.85rem] font-medium text-kamika-ink/60 hover:text-kamika-ink"
              >
                {t(S.clear)}
              </button>
            </div>
          )}
        </div>

        {quote.length === 0 ? (
          <p className="mt-5 rounded-kamika border border-dashed border-kamika-mist px-4 py-8 text-center text-[0.9rem] text-kamika-ink/55">
            {t(S.quoteEmpty)}
          </p>
        ) : (
          <>
            <ul className="mt-5 divide-y divide-kamika-mist rounded-kamika border border-kamika-mist">
              {quote.map((item) => {
                const itemSystem = systemById(item.config.systemId);
                const description = [
                  t(MATERIAL_LABEL[item.config.material]),
                  `${itemSystem.brand} ${itemSystem.name}`,
                  t(SASH_LAYOUTS[item.config.sash].label),
                  `${item.config.widthMm} × ${item.config.heightMm} mm`,
                  t(colorById(item.config.exteriorColorId).name),
                  t(GLAZINGS[item.config.glazing].label),
                  `× ${formatNumber(item.config.quantity, locale)} ${t(S.units)}`,
                ].join(" · ");
                return (
                  <li key={item.id} className="flex items-center gap-4 px-4 py-3.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9rem] font-medium">{t(S.quoteItem)}</p>
                      <p className="truncate text-[0.8rem] text-kamika-ink/60" title={description}>
                        {description}
                      </p>
                    </div>
                    <p className="shrink-0 font-mono text-[0.95rem]">{formatEuro(item.total, locale)}</p>
                    <button
                      type="button"
                      onClick={() => setQuote((prev) => prev.filter((q) => q.id !== item.id))}
                      aria-label={t(S.remove)}
                      title={t(S.remove)}
                      className="shrink-0 rounded-kamika px-2 py-1 text-kamika-ink/45 hover:text-kamika-ink print:hidden"
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t-2 border-kamika-ink pt-3">
              <p className="font-medium">{t(S.quoteTotal)}</p>
              <p className="font-mono text-xl font-medium">{formatEuro(quoteTotal, locale)}</p>
            </div>
            <p className="mt-2 text-right text-[0.75rem] text-kamika-ink/50">{t(S.demoPrices)}</p>
          </>
        )}
      </section>
    </div>
  );
}
