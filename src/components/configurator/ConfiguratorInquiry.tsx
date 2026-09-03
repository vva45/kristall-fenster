"use client";

import type { QuoteItem } from "../../data/configurator/types";
import { InquiryForm } from "../InquiryForm";

export function ConfiguratorInquiry({ quote, onSuccess }: { quote: QuoteItem[]; onSuccess: () => void }) {
  return (
    <div className="mt-14">
      <InquiryForm quote={quote} onSuccess={onSuccess} />
    </div>
  );
}
