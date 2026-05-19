interface WindowPreviewProps {

  width: number
  height: number
  color: string
  opening: string
  layout: string
  productType: string

}

export default function WindowPreview({
  width,
  height,
  color,
  opening,
  layout,
  productType,
}: WindowPreviewProps) {

  const frameColor =
    color === "white"
      ? "#F3F4F6"
      : color === "anthracite"
      ? "#374151"
      : color === "black"
      ? "#111111"
      : "#8B5A2B"

  const materialGradient =
    productType === "PVC"
      ? "#ffffff"
      : productType === "Aluminium"
      ? "#9CA3AF"
      : "#D6B98C"

  const svgWidth = Math.min(width / 4, 520)
  const svgHeight = Math.min(height / 4, 620)

  return (

    <div className="relative flex items-center justify-center transition-all duration-700">

      <div className="absolute w-[120%] h-[120%] bg-blue-500/10 blur-[80px] rounded-full" />

      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 400 500"
        className="drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-700"
      >

        {/* OUTER SHADOW */}

        <rect
          x="12"
          y="12"
          width="376"
          height="476"
          rx="34"
          fill="rgba(0,0,0,0.18)"
        />

        {/* FRAME */}

        <rect
          x="20"
          y="20"
          width="360"
          height="460"
          rx="28"
          fill={frameColor}
        />

        {/* FRAME DEPTH */}

        <rect
          x="32"
          y="32"
          width="336"
          height="436"
          rx="22"
          fill={materialGradient}
          opacity="0.95"
        />

        {/* GLASS */}

        <rect
          x="50"
          y="50"
          width="300"
          height="400"
          rx="14"
          fill="url(#glassGradient)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />

        {/* DOUBLE */}

        {layout === "double" && (

          <line
            x1="200"
            y1="50"
            x2="200"
            y2="450"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="6"
          />

        )}

        {/* CROSS */}

        {layout === "cross" && (
          <>

            <line
              x1="200"
              y1="50"
              x2="200"
              y2="450"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="6"
            />

            <line
              x1="50"
              y1="250"
              x2="350"
              y2="250"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="6"
            />

          </>
        )}

        {/* TILT */}

        {opening === "tilt" && (

          <polygon
            points="50,50 350,70 330,450 50,450"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="4"
          />

        )}

        {/* TILT TURN */}

        {opening === "tiltTurn" && (

          <polygon
            points="50,50 360,90 320,450 50,450"
            fill="rgba(255,255,255,0.10)"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="5"
          />

        )}

        {/* HANDLE */}

        <>

          <rect
            x="322"
            y="205"
            width="12"
            height="90"
            rx="10"
            fill="rgba(0,0,0,0.42)"
          />

          <rect
            x="325"
            y="210"
            width="3"
            height="80"
            rx="6"
            fill="rgba(255,255,255,0.18)"
          />

        </>

        {/* GLASS GRADIENT */}

        <defs>

          <linearGradient
            id="glassGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >

            <stop offset="0%" stopColor="#eaf4ff" />
            <stop offset="100%" stopColor="#bfd4eb" />

          </linearGradient>

        </defs>

      </svg>

    </div>
  )
}