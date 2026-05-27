"use client"

type Props = {
  width: number
  height: number
  quantity: number
  onChange: (data: {
    width?: number
    height?: number
    quantity?: number
  }) => void
}

export default function ConfigStepDimensions({
  width,
  height,
  quantity,
  onChange,
}: Props) {

  return (

    <div className="rounded-[28px] bg-[#071120] border border-white/5 p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Dimensions
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="number"
          value={width}
          onChange={(e) =>
            onChange({
              width: Number(e.target.value),
            })
          }
          placeholder="Width"
          className="bg-[#0B1728] rounded-xl p-4 text-white"
        />

        <input
          type="number"
          value={height}
          onChange={(e) =>
            onChange({
              height: Number(e.target.value),
            })
          }
          placeholder="Height"
          className="bg-[#0B1728] rounded-xl p-4 text-white"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            onChange({
              quantity: Number(e.target.value),
            })
          }
          placeholder="Qty"
          className="bg-[#0B1728] rounded-xl p-4 text-white"
        />

      </div>

    </div>

  )
}