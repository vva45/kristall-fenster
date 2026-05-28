import { useState } from "react"
import ConfigStepProfile from "./ConfigStepProfile"

export default function StepTabs() {
  const [value, setValue] = useState<any>(null)

  const handleChange = (nextValue: any) => {
    setValue(nextValue)
  }

  return (

    <div className="rounded-[28px] bg-[#071120] border border-white/5 p-8">

      <ConfigStepProfile value={value} onChange={handleChange} />

    </div>

  )
}