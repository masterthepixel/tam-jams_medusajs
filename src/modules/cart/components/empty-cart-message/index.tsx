import { Heading, Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="font-display text-display-md font-semibold text-apple-ink"
      >
        Cart
      </Heading>
      <Text className="text-body-apple text-apple-ink mt-4 mb-6 max-w-[32rem]">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <LocalizedClientLink href="/store" className="btn-pill">
          Explore products
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
