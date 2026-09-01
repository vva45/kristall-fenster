"use client";

import { useState } from "react";
import type { QuoteItem } from "../data/configurator/types";
import { pick, useLocale } from "../lib/i18n";

const T = {
  eyebrow: { en: "Request", de: "Anfrage", pl: "Zapytanie" },
  title: { en: "Send your configuration", de: "Konfiguration anfragen", pl: "Wyślij konfigurację" },
  intro: { en: "We check feasibility and prepare the binding quote personally.", de: "Wir prüfen die Machbarkeit und erstellen das verbindliche Angebot persönlich.", pl: "Sprawdzimy wykonalność i przygotujemy indywidualną, wiążącą ofertę." },
  name: { en: "Name", de: "Name", pl: "Imię i nazwisko" },
  email: { en: "Email", de: "E-Mail", pl: "E-mail" },
  phone: { en: "Telephone", de: "Telefon", pl: "Telefon" },
  postcode: { en: "Postcode", de: "Postleitzahl", pl: "Kod pocztowy" },
  address: { en: "Installation address", de: "Montageadresse", pl: "Adres montażu" },
  date: { en: "Preferred date", de: "Wunschtermin", pl: "Preferowany termin" },
  message: { en: "Message", de: "Nachricht", pl: "Wiadomość" },
  files: { en: "Plans or photos", de: "Pläne oder Fotos", pl: "Plany lub zdjęcia" },
  fileHint: { en: "Up to 5 PDF, JPG, PNG or WebP files; 5 MB each, 15 MB total.", de: "Bis zu 5 PDF-, JPG-, PNG- oder WebP-Dateien; je 5 MB, insgesamt 15 MB.", pl: "Do 5 plików PDF, JPG, PNG lub WebP; 5 MB każdy, łącznie 15 MB." },
  privacy: { en: "I have read the privacy policy and agree to the processing of my data for this enquiry.", de: "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten für diese Anfrage zu.", pl: "Zapoznałem(-am) się z polityką prywatności i zgadzam się na przetwarzanie danych w celu obsługi zapytania." },
  send: { en: "Send request", de: "Anfrage senden", pl: "Wyślij zapytanie" },
  sending: { en: "Sending…", de: "Wird gesendet…", pl: "Wysyłanie…" },
  success: { en: "Thank you. Your reference is", de: "Vielen Dank. Ihre Referenz lautet", pl: "Dziękujemy. Numer zapytania:" },
  error: { en: "The request could not be sent. Please contact us by phone or email.", de: "Die Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.", pl: "Nie udało się wysłać zapytania. Skontaktuj się z nami telefonicznie lub e-mailem." },
} as const;

export function InquiryForm({ quote = [] }: { quote?: QuoteItem[] }) {
  const { locale } = useLocale();
  const t = <K extends keyof typeof T>(key: K) => pick(T[key], locale);
  const [state, setState] = useState<{ status: "idle" | "sending" | "success" | "error"; reference?: string }>({ status: "idle" });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setState({ status: "sending" });
    const form = new FormData(formElement);
    form.set("quote", JSON.stringify(quote));
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: form });
      const result = await response.json() as { requestId?: string };
      if (!response.ok || !result.requestId) throw new Error("request failed");
      formElement.reset();
      setState({ status: "success", reference: result.requestId });
    } catch {
      setState({ status: "error" });
    }
  };

  return (
    <section className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-5 md:p-8">
      <p className="kamika-eyebrow">{t("eyebrow")}</p>
      <h2 className="mt-2 text-2xl">{t("title")}</h2>
      <p className="mt-2 max-w-2xl text-sm text-kamika-ink/65">{t("intro")}</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {(["name", "email", "phone", "postcode"] as const).map((field) => (
          <label key={field} className="block text-sm font-medium">
            {t(field)}{field !== "postcode" && " *"}
            <input name={field} type={field === "email" ? "email" : "text"} required={field !== "postcode"} className="mt-1 w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2" />
          </label>
        ))}
        <label className="block text-sm font-medium sm:col-span-2">{t("address")}<input name="address" className="mt-1 w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2" /></label>
        <label className="block text-sm font-medium">{t("date")}<input name="requestedDate" type="date" className="mt-1 w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2" /></label>
        <label className="block text-sm font-medium sm:col-span-2">{t("message")}<textarea name="message" rows={4} className="mt-1 w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2" /></label>
        <label className="block text-sm font-medium sm:col-span-2">{t("files")}<input name="attachments" type="file" multiple accept=".pdf,image/jpeg,image/png,image/webp" className="mt-1 block w-full text-sm" /><span className="mt-1 block text-xs font-normal text-kamika-ink/55">{t("fileHint")}</span></label>
        <label className="flex items-start gap-3 text-sm sm:col-span-2"><input name="privacy" type="checkbox" required className="mt-1" /><span>{t("privacy")} <a href="/datenschutz" className="underline">Datenschutz</a></span></label>
        <div className="sm:col-span-2">
          <button disabled={state.status === "sending"} className="rounded-kamika bg-kamika-ink px-5 py-3 font-medium text-white disabled:opacity-50">{state.status === "sending" ? t("sending") : t("send")}</button>
          <p className={`mt-3 text-sm ${state.status === "error" ? "text-red-700" : "text-kamika-steel"}`} aria-live="polite">
            {state.status === "success" && `${t("success")} ${state.reference}`}
            {state.status === "error" && t("error")}
          </p>
        </div>
      </form>
    </section>
  );
}
