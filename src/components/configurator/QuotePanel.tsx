type Props = {
  config: {
    profile: string
    width: number
    height: number
    quantity: number
  }
}

export default function QuotePanel({
  config,
}: Props) {

  const area =
    (config.width / 1000) *
    (config.height / 1000)

  const price =
    Math.round(
      area *
      250 *
      config.quantity
    )

  return (

    <div className="rounded-[28px] bg-[#071120] border border-white/5 p-8">

      <h3 className="text-white font-bold mb-6">
        Quote Summary
      </h3>

      <div className="space-y-4 text-white/70 mb-8">

        <div>
          Profile: {config.profile}
        </div>

        <div>
          Size: {config.width} × {config.height}
        </div>

        <div>
          Quantity: {config.quantity}
        </div>

      </div>

      <div className="text-5xl font-black text-blue-400">

        €{price}

      </div>

    </div>

  )
}