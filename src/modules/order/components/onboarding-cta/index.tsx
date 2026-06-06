"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Container, Text } from "@medusajs/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="max-w-4xl h-full bg-apple-parchment border border-apple-hairline rounded-lg w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-body-strong text-apple-ink">
          Your test order was successfully created! 🎉
        </Text>
        <Text className="text-body-apple text-apple-ink">
          You can now complete setting up your store in the admin.
        </Text>
        <button
          className="btn-pill w-fit"
          onClick={() => resetOnboardingState(orderId)}
        >
          Complete setup in admin
        </button>
      </div>
    </Container>
  )
}

export default OnboardingCta
