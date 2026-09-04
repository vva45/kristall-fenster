"use client";

import { useEffect, useMemo, useState } from "react";
import { SYSTEMS } from "../../data/configurator/systems";
import type { Localized, WindowConfig } from "../../data/configurator/types";
import { pick, useLocale } from "../../lib/i18n";
import {
  decodeSharedConfiguration,
  encodeSharedConfiguration,
  FAVORITES_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  parseSavedConfigurations,
  PRESETS,
  recommendationsFor,
  serializeSavedConfigurations,
  type SavedConfiguration,
} from "../../lib/configurator-advanced";

const words = {
  eyebrow: { en: "Plan with confidence", de: "Sicher planen", pl: "Planuj pewnie" },
  title: { en: "Configuration studio", de: "Konfigurationsstudio", pl: "Studio konfiguracji" },
  intro: { en: "Compare systems, reuse proven choices and continue where you left off.", de: "Systeme vergleichen, bewährte Auswahl wiederverwenden und später fortfahren.", pl: "Porównuj systemy, korzystaj ze sprawdzonych ustawień i wracaj do pracy później." },
  packages: { en: "Ready-made packages", de: "Vordefinierte Pakete", pl: "Gotowe pakiety" },
  apply: { en: "Apply package", de: "Paket anwenden", pl: "Zastosuj pakiet" },
  recommended: { en: "Recommended for this element", de: "Für dieses Element empfohlen", pl: "Polecane dla tego elementu" },
  compare: { en: "Compare systems", de: "Systeme vergleichen", pl: "Porównaj systemy" },
  compareHint: { en: "Choose up to three systems.", de: "Bis zu drei Systeme auswählen.", pl: "Wybierz maksymalnie trzy systemy." },
  depth: { en: "Depth", de: "Bautiefe", pl: "Głębokość" },
  chambers: { en: "Chambers", de: "Kammern", pl: "Komory" },
  current: { en: "Current", de: "Aktuell", pl: "Aktualny" },
  useSystem: { en: "Use", de: "Übernehmen", pl: "Wybierz" },
  library: { en: "Your configuration library", de: "Ihre Konfigurationsbibliothek", pl: "Twoja biblioteka konfiguracji" },
  favorite: { en: "Save as favourite", de: "Als Favorit speichern", pl: "Zapisz jako ulubioną" },
  history: { en: "Save version", de: "Version speichern", pl: "Zapisz wersję" },
  favorites: { en: "Favourites", de: "Favoriten", pl: "Ulubione" },
  recent: { en: "History", de: "Verlauf", pl: "Historia" },
  empty: { en: "No saved configurations yet.", de: "Noch keine Konfigurationen gespeichert.", pl: "Brak zapisanych konfiguracji." },
  load: { en: "Load", de: "Laden", pl: "Wczytaj" },
  remove: { en: "Remove", de: "Entfernen", pl: "Usuń" },
  share: { en: "Share configuration", de: "Konfiguration teilen", pl: "Udostępnij konfigurację" },
  shareHint: { en: "Create a link that restores this exact selection.", de: "Link erstellen, der genau diese Auswahl wiederherstellt.", pl: "Utwórz link odtwarzający dokładnie ten wybór." },
  copyLink: { en: "Copy link", de: "Link kopieren", pl: "Kopiuj link" },
  linkCopied: { en: "Link copied", de: "Link kopiert", pl: "Link skopiowany" },
  imported: { en: "Shared configuration loaded.", de: "Geteilte Konfiguration geladen.", pl: "Wczytano udostępnioną konfigurację." },
  duplicateRooms: { en: "Duplicate between rooms", de: "Zwischen Räumen duplizieren", pl: "Duplikuj między pomieszczeniami" },
  duplicateHint: { en: "Copy the current element into several rooms at once.", de: "Das aktuelle Element gleichzeitig in mehrere Räume kopieren.", pl: "Skopiuj bieżący element do kilku pomieszczeń naraz." },
  roomPlaceholder: { en: "Kitchen, bedroom, office", de: "Küche, Schlafzimmer, Büro", pl: "Kuchnia, sypialnia, biuro" },
  addRooms: { en: "Add to rooms", de: "Räume hinzufügen", pl: "Dodaj do pomieszczeń" },
} satisfies Record<string, Localized<string>>;

function createSaved(name: string, config: WindowConfig): SavedConfiguration {
  return { id: crypto.randomUUID(), name, config, savedAt: Date.now() };
}

export function AdvancedTools({ config, onApply, onDuplicateRooms, onAnnounce }: { config: WindowConfig; onApply: (config: WindowConfig) => void; onDuplicateRooms: (rooms: string[]) => void; onAnnounce: (message: string) => void }) {
  const { locale } = useLocale();
  const t = <T,>(value: Localized<T>) => pick(value, locale);
  const [favorites, setFavorites] = useState<SavedConfiguration[]>([]);
  const [history, setHistory] = useState<SavedConfiguration[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>(() => [config.systemId]);
  const [rooms, setRooms] = useState("");
  const [ready, setReady] = useState(false);
  const recommended = useMemo(() => recommendationsFor(config).map((id) => PRESETS.find((preset) => preset.id === id)!), [config]);

  useEffect(() => {
    try {
      // Restore browser-only state after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites(parseSavedConfigurations(localStorage.getItem(FAVORITES_STORAGE_KEY)));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory(parseSavedConfigurations(localStorage.getItem(HISTORY_STORAGE_KEY)));
    } catch {
      // Storage may be disabled; the in-memory library still works.
    }
    const shared = decodeSharedConfiguration(new URL(window.location.href).searchParams.get("configuration"));
    if (shared) { onApply(shared); onAnnounce(t(words.imported)); }
    setReady(true);
    // The shared link is intentionally consumed once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(FAVORITES_STORAGE_KEY, serializeSavedConfigurations(favorites)); } catch { /* keep the in-memory library */ } }, [favorites, ready]);
  useEffect(() => { if (ready) try { localStorage.setItem(HISTORY_STORAGE_KEY, serializeSavedConfigurations(history)); } catch { /* keep the in-memory library */ } }, [history, ready]);

  const applyPreset = (patch: Partial<WindowConfig>) => onApply({ ...config, ...patch });
  const visibleSystems = SYSTEMS.filter((system) => system.configurable !== false && (selectedSystems.includes(system.id) || system.material === config.material) && (system.productKind ?? "window") === (config.sash.startsWith("slide") ? "sliding" : "window"));
  const compared = selectedSystems.map((id) => SYSTEMS.find((system) => system.id === id)).filter(Boolean) as typeof SYSTEMS;
  const save = (kind: "favorite" | "history") => {
    const system = SYSTEMS.find((candidate) => candidate.id === config.systemId);
    const item = createSaved(`${system?.brand ?? "Kamika"} ${system?.name ?? ""} · ${config.widthMm}×${config.heightMm}`, config);
    if (kind === "favorite") setFavorites((items) => [item, ...items]); else setHistory((items) => [item, ...items]);
  };
  const renderLibrary = (items: SavedConfiguration[], update: React.Dispatch<React.SetStateAction<SavedConfiguration[]>>) => items.length ? (
    <ul className="space-y-2">{items.slice(0, 5).map((item) => <li key={item.id} className="flex items-center gap-2 rounded-kamika border border-kamika-mist bg-white p-2.5"><button type="button" onClick={() => onApply(item.config)} className="min-w-0 flex-1 text-left"><strong className="block truncate text-sm">{item.name}</strong><span className="text-xs text-kamika-ink/50">{new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(item.savedAt)}</span></button><button type="button" onClick={() => onApply(item.config)} className="text-xs font-medium text-kamika-steel">{t(words.load)}</button><button type="button" aria-label={t(words.remove)} onClick={() => update((current) => current.filter(({ id }) => id !== item.id))} className="px-1 text-kamika-ink/45">×</button></li>)}</ul>
  ) : <p className="text-sm text-kamika-ink/50">{t(words.empty)}</p>;

  return <section className="mt-14 rounded-kamika border border-kamika-mist bg-kamika-blue-50/40 p-5 md:p-8">
    <p className="kamika-eyebrow">{t(words.eyebrow)}</p><h2 className="mt-1 text-2xl">{t(words.title)}</h2><p className="mt-2 max-w-2xl text-sm text-kamika-ink/65">{t(words.intro)}</p>
    <div className="mt-7 grid gap-6 xl:grid-cols-2">
      <article className="rounded-kamika border border-kamika-mist bg-white p-5 xl:col-span-2"><h3 className="text-lg">{t(words.packages)}</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{PRESETS.map((preset) => <div key={preset.id} className="flex flex-col rounded-kamika border border-kamika-mist p-3"><strong className="text-sm">{t(preset.name)}</strong><p className="mt-1 flex-1 text-xs leading-relaxed text-kamika-ink/60">{t(preset.description)}</p><button type="button" onClick={() => applyPreset(preset.patch)} className="mt-3 text-left text-xs font-semibold text-kamika-steel">{t(words.apply)} →</button></div>)}</div><div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-xs font-semibold uppercase tracking-wide text-kamika-ink/50">{t(words.recommended)}</span>{recommended.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset.patch)} className="rounded-full bg-kamika-blue-50 px-3 py-1 text-xs font-medium text-kamika-steel">{t(preset.name)}</button>)}</div></article>
      <article className="rounded-kamika border border-kamika-mist bg-white p-5"><h3 className="text-lg">{t(words.compare)}</h3><p className="text-xs text-kamika-ink/55">{t(words.compareHint)}</p><div className="mt-3 flex max-h-32 flex-wrap gap-2 overflow-auto">{visibleSystems.map((system) => { const checked = selectedSystems.includes(system.id); return <label key={system.id} className="flex cursor-pointer items-center gap-1.5 rounded-full border border-kamika-mist px-2.5 py-1 text-xs"><input type="checkbox" checked={checked} disabled={!checked && selectedSystems.length >= 3} onChange={() => setSelectedSystems((ids) => checked ? ids.filter((id) => id !== system.id) : [...ids, system.id])}/>{system.brand} {system.name}</label>; })}</div>{compared.length > 0 && <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr><th className="p-2"/><th className="p-2">{t(words.depth)}</th><th className="p-2">Uw</th><th className="p-2">{t(words.chambers)}</th><th/></tr></thead><tbody>{compared.map((system) => <tr key={system.id} className="border-t border-kamika-mist"><th className="p-2 font-medium">{system.brand}<br/><span className="font-normal">{system.name}</span>{system.id === config.systemId && <span className="ml-1 text-kamika-steel">· {t(words.current)}</span>}</th><td className="p-2">{system.depthMm ? `${system.depthMm} mm` : "—"}</td><td className="p-2">{system.uw ? t(system.uw) : "—"}</td><td className="p-2">{system.chambers ? t(system.chambers) : "—"}</td><td className="p-2"><button type="button" onClick={() => onApply({ ...config, material: system.material, systemId: system.id })} className="font-semibold text-kamika-steel">{t(words.useSystem)}</button></td></tr>)}</tbody></table></div>}</article>
      <article className="rounded-kamika border border-kamika-mist bg-white p-5"><h3 className="text-lg">{t(words.library)}</h3><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => save("favorite")} className="rounded-kamika bg-kamika-ink px-3 py-2 text-xs font-medium text-white">♡ {t(words.favorite)}</button><button type="button" onClick={() => save("history")} className="rounded-kamika border border-kamika-mist px-3 py-2 text-xs font-medium">↻ {t(words.history)}</button></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><div><h4 className="mb-2 text-sm font-semibold">{t(words.favorites)}</h4>{renderLibrary(favorites, setFavorites)}</div><div><h4 className="mb-2 text-sm font-semibold">{t(words.recent)}</h4>{renderLibrary(history, setHistory)}</div></div></article>
      <article className="rounded-kamika border border-kamika-mist bg-white p-5"><h3 className="text-lg">{t(words.share)}</h3><p className="mt-1 text-sm text-kamika-ink/60">{t(words.shareHint)}</p><button type="button" onClick={async () => { const url = new URL(window.location.href); url.searchParams.set("configuration", encodeSharedConfiguration(config)); await navigator.clipboard.writeText(url.toString()); onAnnounce(t(words.linkCopied)); }} className="mt-3 rounded-kamika bg-kamika-steel px-3 py-2 text-xs font-medium text-white">↗ {t(words.copyLink)}</button><div className="mt-6 border-t border-kamika-mist pt-5"><h3 className="text-lg">{t(words.duplicateRooms)}</h3><p className="mt-1 text-sm text-kamika-ink/60">{t(words.duplicateHint)}</p><div className="mt-3 flex gap-2"><input value={rooms} onChange={(event) => setRooms(event.target.value)} placeholder={t(words.roomPlaceholder)} className="min-w-0 flex-1 rounded-kamika border border-kamika-mist px-3 py-2 text-sm"/><button type="button" onClick={() => { const names = rooms.split(",").map((room) => room.trim()).filter(Boolean); if (names.length) { onDuplicateRooms(names); setRooms(""); } }} className="rounded-kamika border border-kamika-ink/20 px-3 py-2 text-xs font-medium">{t(words.addRooms)}</button></div></div></article>
    </div>
  </section>;
}
