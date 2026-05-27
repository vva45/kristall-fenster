type Props = {
  config: {
    profile: string
    width: number
    height: number
    quantity: number
  }
}

export default function WindowPreview({
  config,
}: Props) {

  return (

    <div className="rounded-[28px] bg-[#071120] border border-white/5 p-8">

      <h3 className="text-white font-bold mb-6">
        Window Preview
      </h3>

      <div className="h-[320px] rounded-[20px] bg-[#0B1728] flex flex-col items-center justify-center">

        <div className="w-[180px] h-[220px] border-[12px] border-white rounded-xl relative">

          <div className="absolute top-0 bottom-0 left-1/2 w-[4px] bg-white/30 -translate-x-1/2" />

        </div>

        <div className="mt-6 text-blue-400 font-semibold">

          {config.width} × {config.height} mm

        </div>

      </div>

    </div>

  )
}