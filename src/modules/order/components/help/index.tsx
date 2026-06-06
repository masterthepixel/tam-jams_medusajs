import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-body-strong text-apple-ink">Need help?</Heading>
      <div className="text-body-apple text-apple-ink my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact" className="text-apple-blue">Contact</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact" className="text-apple-blue">
              Returns &amp; Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
