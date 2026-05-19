import {
  products,
  glassOptions,
  colorOptions,
  openingOptions,
} from "@/data/products"

type ProductType = keyof typeof products
type GlassType = keyof typeof glassOptions
type ColorType = keyof typeof colorOptions
type OpeningType = keyof typeof openingOptions

interface CalculatePriceProps {

  productType: ProductType
  width: number
  height: number
  glassType: GlassType
  color: ColorType
  opening: OpeningType

}

export function calculatePrice({
  productType,
  width,
  height,
  glassType,
  color,
  opening,
}: CalculatePriceProps) {

  const product = products[productType]

  const area = (width * height) / 1000000

  const total =
    product.basePrice +
    area * product.areaMultiplier +
    glassOptions[glassType] +
    colorOptions[color] +
    openingOptions[opening]

  return Math.round(total)
}