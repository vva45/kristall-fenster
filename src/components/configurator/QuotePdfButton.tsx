"use client";

import { useState } from "react";
import type { QuoteItem } from "../../data/configurator/types";

export function QuotePdfButton({
  items,
  label,
  onError,
}: {
  items: QuoteItem[];
  label: string;
  onError: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/quote/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, reference: "Online-Konfiguration" }),
      });
      if (!response.ok) throw new Error("pdf failed");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "kristall-fenster-anfrage.pdf";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch {
      onError();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isDownloading}
      onClick={download}
      className="rounded-kamika border border-kamika-ink/25 px-4 py-2 text-[0.85rem] font-medium hover:border-kamika-ink disabled:opacity-50"
    >
      {label}
    </button>
  );
}
