"use client"

import { useState } from "react"

import WindowPreview from "./WindowPreview"

import { calculatePrice } from "@/lib/calculatePrice"

export default function Configurator() {

  const [productType, setProductType] =
    useState<"PVC" | "Aluminium" | "Wood">("PVC")

  const [width, setWidth] =
    useState<number>(1200)

  const [height, setHeight] =
    useState<number>(1400)

  const [glassType, setGlassType] =
    useState<
      "double" |
      "triple" |
      "acoustic" |
      "security"
    >("double")

  const [color, setColor] =
    useState<
      "white" |
      "anthracite" |
      "black" |
      "wood"
    >("white")

  const [opening, setOpening] =
    useState<
      "fixed" |
      "tilt" |
      "tiltTurn" |
      "sliding"
    >("fixed")

  const [layout, setLayout] =
    useState<
      "single" |
      "double" |
      "cross"
    >("single")

  const total = calculatePrice({
    productType,
    width,
    height,
    glassType,
    color,
    opening,
  })

  return (

    <div className="grid lg:grid-cols-2 gap-10 p-10 rounded-[32px] bg-white/5 border border-white/10">

      {/* LEFT */}

      <div className="space-y-6">

        {/* MATERIAL */}

        <div>

          <label>Material</label>

          <select
            value={productType}
            onChange={(e) =>
              setProductType(
                e.target.value as
                  | "PVC"
                  | "Aluminium"
                  | "Wood"
              )
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          >

            <option value="PVC">PVC</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Wood">Wood</option>

          </select>

        </div>

        {/* WIDTH */}

        <div>

          <label>Width</label>

          <input
            type="number"
            value={width}
            onChange={(e) =>
              setWidth(Number(e.target.value))
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          />

        </div>

        {/* HEIGHT */}

        <div>

          <label>Height</label>

          <input
            type="number"
            value={height}
            onChange={(e) =>
              setHeight(Number(e.target.value))
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          />

        </div>

        {/* GLASS */}

        <div>

          <label>Glass</label>

          <select
            value={glassType}
            onChange={(e) =>
              setGlassType(
                e.target.value as
                  | "double"
                  | "triple"
                  | "acoustic"
                  | "security"
              )
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          >

            <option value="double">Double</option>
            <option value="triple">Triple</option>
            <option value="acoustic">Acoustic</option>
            <option value="security">Security</option>

          </select>

        </div>

        {/* COLOR */}

        <div>

          <label>Color</label>

          <select
            value={color}
            onChange={(e) =>
              setColor(
                e.target.value as
                  | "white"
                  | "anthracite"
                  | "black"
                  | "wood"
              )
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          >

            <option value="white">White</option>
            <option value="anthracite">Anthracite</option>
            <option value="black">Black</option>
            <option value="wood">Wood</option>

          </select>

        </div>

        {/* OPENING */}

        <div>

          <label>Opening</label>

          <select
            value={opening}
            onChange={(e) =>
              setOpening(
                e.target.value as
                  | "fixed"
                  | "tilt"
                  | "tiltTurn"
                  | "sliding"
              )
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          >

            <option value="fixed">Fixed</option>
            <option value="tilt">Tilt</option>
            <option value="tiltTurn">Tilt Turn</option>
            <option value="sliding">Sliding</option>

          </select>

        </div>

        {/* LAYOUT */}

        <div>

          <label>Layout</label>

          <select
            value={layout}
            onChange={(e) =>
              setLayout(
                e.target.value as
                  | "single"
                  | "double"
                  | "cross"
              )
            }
            className="w-full mt-2 p-4 rounded-2xl bg-[#07182f]"
          >

            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="cross">Cross</option>

          </select>

        </div>

      </div>

      {/* RIGHT */}

      <div className="rounded-[32px] bg-[#07182f] p-10 border border-white/10">

        <h2 className="text-3xl font-black mb-10 text-center">
          Live Preview
        </h2>

        <WindowPreview
          width={width}
          height={height}
          color={color}
          opening={opening}
          layout={layout}
          productType={productType}
        />

        <div className="mt-10 space-y-4">

          <div className="flex justify-between">
            <span className="text-white/50">Material</span>
            <span>{productType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Glass</span>
            <span>{glassType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Color</span>
            <span>{color}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Opening</span>
            <span>{opening}</span>
          </div>

        </div>

        <div className="mt-12 w-full p-8 rounded-[28px] bg-blue-600">

          <p className="text-blue-100">
            Estimated Price
          </p>

          <h3 className="text-6xl font-black mt-2">
            €{total}
          </h3>

        </div>

      </div>

    </div>
  )
}