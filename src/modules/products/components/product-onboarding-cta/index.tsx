import { Button, Container, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

async function ProductOnboardingCta() {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="max-w-4xl h-full bg-apple-parchment border border-apple-hairline rounded-lg w-full p-6">
      <div className="flex flex-col gap-y-4 center">
        <Text className="text-body-apple text-apple-ink">
          Your demo product was successfully created! 🎉
        </Text>
        <Text className="text-body-apple text-apple-ink">
          You can now continue setting up your store in the admin.
        </Text>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button className="btn-pill w-full">Continue setup in admin</Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
