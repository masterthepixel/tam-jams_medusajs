import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper" className="bg-apple-canvas border border-apple-hairline rounded-lg overflow-hidden">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
          className="w-full"
        />
        <Text className="text-body-strong font-semibold text-apple-ink mt-4 px-4" data-testid="product-title">
          {product.title}
        </Text>
        <div className="text-body-apple text-apple-ink px-4 pb-4">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
        <span className="text-apple-blue text-body-apple mt-2 px-4 pb-4 block">Learn more</span>
      </div>
    </LocalizedClientLink>
  )
}
