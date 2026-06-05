import ProductTemplate from "@/components/products/ProductTemplate"

export default function Page() {
  return (
  <ProductTemplate
  slug="energeto-8000"
  title="Energeto 8000"
  manufacturer="Aluplast"
  description="Reliable PVC system with excellent thermal performance."

  image="/products/energeto-8000.jpg"

  features={[
    "5 chamber system",
    "Excellent value for money",
    "Up to 41 mm glazing",
    "German engineering",
  ]}

  technical={{
    installationDepth: "70 mm",
    chambers: "5",
    glazing: "24-41 mm",
    uw: "0.96 W/m²K",
  }}
/>
  )
}