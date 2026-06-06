import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

const TILE_CLASSES = [
  "tile tile--light",
  "tile tile--dark",
  "tile tile--parchment",
] as const

const HEADING_COLORS = [
  "text-apple-ink",
  "text-white",
  "text-apple-ink",
] as const

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return collections.map((collection, index) => (
    <li key={collection.id} className={TILE_CLASSES[index % 3]}>
      <h2
        className={`font-display text-display-lg font-semibold tracking-tight mb-8 ${HEADING_COLORS[index % 3]}`}
      >
        {collection.title}
      </h2>
      <ProductRail collection={collection} region={region} />
    </li>
  ))
}
