# Apple Design Conversion Plan — tam-jams_medusajs

> **Design source of truth:** [`apple-design.md`](./apple-design.md) (the corrected local Apple spec).
> **Target repo:** Medusa Next.js Starter storefront (`src/app`, `src/modules`).
> **Goal:** Re-skin every UI element to the Apple design language (single Action Blue accent, SF Pro type ladder, edge-to-edge tiles, one product shadow, pill CTAs) **without** changing data-fetching, routing, or business logic.

---

## 0. How this plan parallelizes

The work is split into **one blocking foundation phase** and then **independent streams that own disjoint folder sets**. Because no two streams write the same files, multiple agents can run concurrently after Phase 0 lands.

```
Phase 0 (FOUNDATION) ── must merge first, single agent, blocks everyone
        │
        ├─ Stream A  Layout & Global Chrome
        ├─ Stream B  Home / Marketing tiles
        ├─ Stream C  Product & Store catalog
        ├─ Stream D  Cart & Checkout
        ├─ Stream E  Account & Orders
        ├─ Stream F  Common primitives & Skeletons
        └─ Stream G  Icons & micro-tokens
                         (A–G run in PARALLEL)
        │
Phase 2 (INTEGRATION) ── single agent, visual QA + responsive sweep
```

**Hard rule for parallel safety:** a stream may only edit files inside the folders listed under its "Owns" section. Anything shared lives in Phase 0 or Stream F and is treated as a frozen contract by everyone else.

---

## 1. Current-state audit (what exists today)

| Layer | Today | Where |
|---|---|---|
| Color tokens | `@medusajs/ui-preset` semantic tokens (`ui-fg-base`, `ui-bg-subtle`, `ui-border-base`) + custom `grey.0–90` | `tailwind.config.js`, component classNames |
| Typography | `txt-*` / `text-*-regular|plus` preset classes, Inter font | preset + `tailwind.config.js` |
| Radius | `none/soft(2)/base(4)/rounded(8)/large(16)/circle` | `tailwind.config.js` |
| Buttons | `@medusajs/ui` `<Button variant="primary|secondary|transparent">` | ~all interactive modules |
| Containers | `.content-container` (max-w-1440 px-6), `.contrast-btn` | `globals.css` |
| Hero | Center-stacked heading + secondary button, `75vh`, subtle bg | `modules/home/components/hero` |
| Nav | Sticky 64px white bar, side menu, cart button | `modules/layout/templates/nav` |
| Footer | Link columns | `modules/layout/templates/footer` |
| Product card | Thumbnail + title + price row | `modules/products/components/product-preview` |
| Forms | `input`, `native-select`, `checkbox`, `radio`, `modal` | `modules/common/components` |
| Skeletons | 16 skeleton components | `modules/skeletons` |
| Icons | 18 custom SVG icon components | `modules/common/icons` |

**Implication:** The fastest, lowest-risk path is **token-level remapping first** (so `@medusajs/ui` variants and existing classes inherit the new look), then **component-level overrides** only where the Apple grammar differs structurally (pill CTAs, full-bleed tiles, the single product shadow).

---

## 2. Token mapping (Phase 0 deliverable)

Map the Apple spec tokens onto the repo's Tailwind config + a new CSS token layer. Agents in later streams reference **these class names only**, never raw hex.

### Colors → `tailwind.config.js theme.extend.colors`
| Apple token | Hex | Tailwind key to add |
|---|---|---|
| `primary` | `#0071e3` | `apple.blue` / map to `ui-fg-interactive` override |
| `primary-press` | `#0066cc` | `apple.bluePress` |
| `primary-on-dark` | `#2997ff` | `apple.blueOnDark` |
| `ink` / `body` | `#1d1d1f` | `apple.ink` |
| `body-on-dark` | `#ffffff` | `apple.onDark` |
| `body-muted` | `#cccccc` | `apple.bodyMuted` |
| `ink-muted-80` | `#333333` | `apple.ink80` |
| `ink-muted-48` | `#7a7a7a` | `apple.ink48` |
| `canvas` | `#ffffff` | `apple.canvas` |
| `canvas-parchment` | `#f5f5f7` | `apple.parchment` |
| `surface-pearl` | `#fafafc` | `apple.pearl` |
| `surface-tile-1/2/3` | `#272729/#2a2a2c/#252527` | `apple.tile1/2/3` |
| `surface-black` | `#000000` | `apple.black` |
| `hairline` | `#e0e0e0` | `apple.hairline` |
| `divider-soft` | `#f0f0f0` | `apple.divider` |

### Typography → `fontFamily` + a `fontSize` ladder
- `fontFamily.sans` → `["SF Pro Text","system-ui","-apple-system","BlinkMacSystemFont","Inter","sans-serif"]`
- Add `fontFamily.display` → `["SF Pro Display","system-ui","-apple-system","Inter","sans-serif"]`
- Add named sizes matching the spec (`hero-display 56/1.07/-0.28`, `display-lg 40/1.1/0`, `display-md 34/1.18/-0.374`, `lead 28`, `tagline 21/700`, `body 17/1.47/-0.374`, `button-pill 17/1.0`, `caption 14`, `fine-print 12`, `micro-legal 10`). Negative tracking baked into the `letterSpacing` of each entry.

### Radius → `borderRadius`
`none 0`, `xs 5`, `sm 8`, `md 11`, `lg 18`, `pill 9999`, `full 9999`. (Replace/extend the current `soft/base/rounded/large` set; keep aliases so existing classes don't break mid-migration.)

### Spacing → `spacing`
Add `section: 80px` (and `md: 17px` — intentionally off-grid). Keep Tailwind defaults for the rest.

### Shadow → single token
`boxShadow.product = "0 5px 30px 3px rgba(0,0,0,0.22)"`. **No other custom shadows allowed.**

### Global CSS (`src/styles/globals.css`)
- Replace `.contrast-btn` with Apple button utilities: `.btn-pill` (Action Blue fill, `button-pill` type, `rounded-pill`, 11×22), `.btn-pill-ghost` (transparent, 1px blue border), `.btn-dark-utility` (`#1d1d1f`, `rounded-sm`).
- Add `.tile` (full-bleed, `py-section`, `rounded-none`) and `.tile--dark` / `.tile--parchment` modifiers.
- Add `:active { transform: scale(0.95) }` press behavior on `.btn-*`.

---

## 3. Phase 0 — Foundation (BLOCKING, one agent)

**Owns:** `tailwind.config.js`, `src/styles/globals.css`, **new file** `src/styles/apple-tokens.css` (optional CSS-var layer), `postcss.config.js` (only if needed).

**Tasks**
1. Add all color/type/radius/spacing/shadow tokens from §2.
2. Provide Apple button utility classes + tile utilities in `globals.css`.
3. Keep legacy `grey.*` and old radius keys as aliases so unconverted components still compile.
4. Load SF Pro stack with Inter fallback (no new font files needed — system-ui resolves SF Pro on Apple devices; Inter via existing setup elsewhere).
5. Export a short **"contract" comment block** at the top of `globals.css` listing the canonical class names streams must use.

**Definition of done:** repo builds, every new token/class resolves, no visual regression required yet (legacy aliases still in place). Merge before any stream starts.

---

## 4. Parallel streams (run concurrently after Phase 0)

Each stream: convert every element in its folders to Apple tokens/classes, apply the Do/Don't rules from the spec, ship one PR.

### Stream A — Layout & Global Chrome
**Owns:** `src/modules/layout/**`, `src/app/[countryCode]/(main)/layout.tsx`, `src/app/[countryCode]/(checkout)/layout.tsx`
**Convert:**
- `nav` → two-row Apple grammar: slim near-black `global-nav` (44px) + parchment frosted `sub-nav-frosted` (52px, `backdrop-blur saturate(180%) blur(20px)`, category name in `tagline` 21/700, right-aligned `btn-pill` CTA).
- `side-menu`, `cart-button`, `cart-dropdown`, `country-select`, `language-select`, `cart-mismatch-banner` → Apple type + Action Blue links + `btn-dark-utility` for nav actions.
- `footer` → `parchment` bg, `dense-link` columns (17/2.41), `caption-strong` headings, `fine-print` legal row in `ink-48`.

### Stream B — Home / Marketing tiles
**Owns:** `src/modules/home/**`, `src/app/[countryCode]/(main)/page.tsx`
**Convert:**
- `hero` → full-bleed `product-tile-light` (or parchment): `display-lg` headline, `lead` tagline, two pill CTAs (`btn-pill` + `btn-pill-ghost`), product render with the single `shadow-product`. Drop the GitHub/secondary template chrome.
- `featured-products` → alternating light↔dark tile rhythm; product grid uses Stream C's card (treat card as a frozen import).

### Stream C — Product & Store catalog
**Owns:** `src/modules/products/**`, `src/modules/store/**`, `src/modules/categories/**`, `src/modules/collections/**`, related `src/app/[countryCode]/(main)/{products,store,categories,collections}/**`
**Convert:**
- `product-preview` → `store-utility-card` (white, 1px `hairline`, `rounded-lg`, 1:1 thumb `rounded-sm`, `body-strong` title, `body` price, Action Blue `text-link`).
- `image-gallery`, `thumbnail` → product render carries `shadow-product`; circular controls = `button-icon-circular` (44px translucent chip).
- `product-actions` (variant selectors) → `configurator-option-chip` pills + `-selected` (2px Action Blue).
- `product-price`, `product-tabs`, `related-products`, `product-info` → Apple type ladder.
- `store` templates, `refinement-list`, `pagination`, `sort-products` → `caption`/`body` type, Action Blue active states, pill filters.

### Stream D — Cart & Checkout
**Owns:** `src/modules/cart/**`, `src/modules/checkout/**`, `src/modules/shipping/**`, `src/app/[countryCode]/(main)/cart/**`, `src/app/[countryCode]/(checkout)/**`
**Convert:**
- Cart `item`, `cart-totals`, `empty-cart-message`, `sign-in-prompt` → Apple type, Action Blue links, `btn-pill` primary actions.
- Checkout `addresses`, `shipping`, `payment*`, `review`, `discount-code`, `submit-button`, `country-select`, `error-message` → form fields use Stream F primitives (frozen), primary CTA = `btn-pill`, summary surfaces = `parchment`.
- `free-shipping-price-nudge` + the checkout "Add to Bag" → `floating-sticky-bar` (parchment 80% + backdrop-blur, `btn-pill`).

### Stream E — Account & Orders
**Owns:** `src/modules/account/**`, `src/modules/order/**`, `src/app/[countryCode]/(main)/{account,order}/**`
**Convert:**
- `login`, `register`, `account-info`, `account-nav`, `address-book`, `address-card`, `profile-*`, `transfer-request-form`, `overview` → Apple type, `btn-pill` CTAs, form primitives from Stream F.
- Order `items`, `order-details`, `order-summary`, `payment-details`, `shipping-details`, `help`, `onboarding-cta`, `transfer-*` → `caption`/`body` ladder, Action Blue links, hairline dividers.

### Stream F — Common primitives & Skeletons (high-leverage, schedule early)
**Owns:** `src/modules/common/**`, `src/modules/skeletons/**`
**Convert (these are imported everywhere — publish as a frozen contract ASAP so D/E/C can rely on them):**
- `input`, `native-select`, `checkbox`, `radio`, `filter-radio-group` → Apple `search-input`/form grammar: white fill, 1px `divider-soft`, `rounded-pill` (inputs) or `rounded-sm`, `body` 17px, Action Blue focus ring (`primary` light / `primary-on-dark` dark).
- `modal`, `divider`, `interactive-link`, `delete-button`, `cart-totals`, `line-item-*` → Apple type + hairlines; links Action Blue.
- `localized-client-link` → no visual change (logic only) — **do not restyle**, just confirm.
- Skeletons → recolor to `parchment`/`pearl` shimmer, match new radii (`rounded-lg` cards, `rounded-pill` buttons).

### Stream G — Icons & micro-tokens
**Owns:** `src/modules/common/icons/**`
**Convert:** ensure all 18 icons inherit `currentColor` (so they pick up Action Blue / ink contextually); normalize stroke weights; no hardcoded fills. Lowest-risk, fully isolated — ideal for the smallest agent.

---

## 5. Coordination contract (so parallel agents don't collide)

1. **File ownership is exclusive.** A stream edits only files in its "Owns" list. If a change is needed in a shared file, it goes back to Phase 0 or Stream F — never edited by two streams.
2. **Frozen contracts:** `tailwind.config.js`, `globals.css` (Phase 0) and `modules/common`, `modules/skeletons`, `modules/common/icons` (Streams F/G) are *consumed read-only* by A–E. Land F and G early; downstream streams import their output unchanged.
3. **No raw hex / no inline shadows.** Everything references the Phase 0 tokens. The only shadow is `shadow-product`, only on product imagery.
4. **States:** default + active (`scale(0.95)`) only. Do not add hover-state docs/styles per the spec.
5. **Branch + PR per stream** (`feat/apple-<stream>`), all branched off the merged Phase 0 commit. Merge order: Phase 0 → F → G → A,B,C,D,E (any order) → Phase 2.
6. **Do-not-touch:** `src/lib/**` (data/actions/hooks), routing params, `*.test.*`, env files. This is a re-skin, not a refactor.

---

## 6. Phase 2 — Integration & QA (single agent)

- Responsive sweep against the spec breakpoints (1440 lock, 1068, 833, 640, 480): nav collapse, tile padding 80→48, grid 5→4→3→2→1.
- Verify the **single accent** rule (grep for stray non-Action-Blue interactive colors).
- Verify **single shadow** rule (grep for `shadow-` usages outside `shadow-product`).
- Contrast check `ink-48` usages (AA-large/decorative only).
- Remove legacy aliases (`grey.*`, old radii) once no component references them.
- Visual diff the five surface archetypes (home, store/PLP, PDP, cart/checkout, account).

---

## 7. Element → Apple component crosswalk (quick reference)

| Repo element | Apple component |
|---|---|
| `Button variant=primary` | `button-primary` (pill, Action Blue) |
| `Button variant=secondary` | `button-secondary-pill` (ghost) |
| nav actions / cart / locale | `button-dark-utility` |
| `nav` bar | `global-nav` + `sub-nav-frosted` |
| `hero` | `product-tile-light` / `-parchment` |
| featured grid bands | `product-tile-dark` (+`-2`/`-3`) |
| `product-preview` | `store-utility-card` |
| variant selectors | `configurator-option-chip` (+`-selected`) |
| `input` / search | `search-input` |
| checkout add-to-bag bar | `floating-sticky-bar` |
| environment/marketing quote | `environment-quote-card` |
| `footer` | `footer` |
| image carousel controls | `button-icon-circular` |

---

### TL;DR for an orchestrator
1. Run **Phase 0** (one agent) — merge.
2. Fan out **Streams F + G** first (frozen primitives), then **A, B, C, D, E** in parallel — each owns disjoint folders, branches off Phase 0.
3. Run **Phase 2** (one agent) for responsive + single-accent/single-shadow QA and alias cleanup.
