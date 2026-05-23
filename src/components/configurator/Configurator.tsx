"use client"

import WindowPreview from "./WindowPreview"
import QuotePanel from "./QuotePanel"
import StepTabs from "./StepTabs"

export default function Configurator() {

  return (

    <div className="grid lg:grid-cols-[1fr_420px] gap-8">

      <div className="space-y-6">

        <StepTabs />

      </div>

      <div className="space-y-6">

        <WindowPreview />

        <QuotePanel />

      </div>

    </div>

  )
}