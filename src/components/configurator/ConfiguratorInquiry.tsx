"use client";

import type { QuoteItem } from "../../data/configurator/types";
import { InquiryForm } from "../InquiryForm";

export function ConfiguratorInquiry({ quote }: { quote: QuoteItem[] }) {
  return (
    <div className="mt-14">
      <InquiryForm quote={quote} />
    </div>
  );
}
