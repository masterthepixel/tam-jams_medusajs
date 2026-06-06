import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-apple-canvas flex items-center justify-between">
      <div>
        <Heading level="h2" className="text-body-strong text-apple-ink">
          Already have an account?
        </Heading>
        <Text className="text-body-apple text-apple-ink mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button className="btn-pill" data-testid="sign-in-button">
            Sign in
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
