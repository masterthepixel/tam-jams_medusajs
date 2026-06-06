import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Global nav — black bar */}
      <div className="bg-apple-black h-11 px-6 relative flex items-center justify-between">
        <div className="flex items-center">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
        </div>
        <LocalizedClientLink
          href="/"
          className="text-white text-nav-link uppercase absolute left-1/2 -translate-x-1/2"
          data-testid="nav-store-link"
        >
          Tam Jams
        </LocalizedClientLink>
        <div className="flex items-center gap-x-4">
          <LocalizedClientLink
            className="text-white text-nav-link hidden small:block"
            href="/account"
            data-testid="nav-account-link"
          >
            Account
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="text-white text-nav-link"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart (0)
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </div>
      {/* Sub-nav — frosted bar */}
      <div className="frosted sticky top-11 inset-x-0 z-40 h-[52px] px-6 flex items-center justify-between border-b border-apple-hairline">
        <span className="font-display text-tagline font-bold text-apple-ink">
          Tam Jams
        </span>
        <nav className="flex items-center gap-x-6">
          <LocalizedClientLink
            href="/store"
            className="text-button-utility text-apple-ink"
          >
            Shop All
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account"
            className="text-button-utility text-apple-ink"
          >
            Account
          </LocalizedClientLink>
          <LocalizedClientLink href="/cart" className="btn-pill">
            Shop
          </LocalizedClientLink>
        </nav>
      </div>
    </div>
  )
}
