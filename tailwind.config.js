const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        // Apple design tokens — canonical interactive/surface palette.
        // See docs/design/apple-design.md. Single accent: apple.blue.
        apple: {
          blue: "#0071e3", // primary — every interactive element
          bluePress: "#0066cc", // pressed/active tint
          blueOnDark: "#2997ff", // links + focus ring on dark tiles
          ink: "#1d1d1f", // headlines + body on light
          ink80: "#333333", // body on pearl surfaces
          ink48: "#7a7a7a", // legal/disabled — AA-large/decorative only
          onDark: "#ffffff", // text on dark tiles
          bodyMuted: "#cccccc", // secondary copy on dark tiles
          canvas: "#ffffff",
          parchment: "#f5f5f7",
          pearl: "#fafafc",
          tile1: "#272729",
          tile2: "#2a2a2c",
          tile3: "#252527",
          black: "#000000",
          hairline: "#e0e0e0",
          divider: "#f0f0f0",
          chip: "#d2d2d7", // translucent control chip base (apply ~64% alpha)
        },
      },
      borderRadius: {
        // Apple radius scale (canonical).
        none: "0px",
        xs: "5px",
        sm: "8px",
        md: "11px",
        lg: "18px",
        pill: "9999px",
        full: "9999px",
      },
      boxShadow: {
        // The ONLY custom shadow in the system — product imagery resting on a surface.
        product: "0 5px 30px 3px rgba(0, 0, 0, 0.22)",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      spacing: {
        // Apple section rhythm. md (17px) is intentionally off the 8px grid —
        // it mirrors the 17px body type rhythm.
        md: "17px",
        section: "80px",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
        // Apple type ladder — see docs/design/apple-design.md.
        // [size, { lineHeight, letterSpacing, fontWeight }]
        "hero-display": ["56px", { lineHeight: "1.07", letterSpacing: "-0.28px", fontWeight: "600" }],
        "display-lg": ["40px", { lineHeight: "1.1", letterSpacing: "0px", fontWeight: "600" }],
        "display-md": ["34px", { lineHeight: "1.18", letterSpacing: "-0.374px", fontWeight: "600" }],
        lead: ["28px", { lineHeight: "1.14", letterSpacing: "0.196px", fontWeight: "400" }],
        "lead-airy": ["24px", { lineHeight: "1.5", letterSpacing: "0px", fontWeight: "300" }],
        tagline: ["21px", { lineHeight: "1.19", letterSpacing: "0.231px", fontWeight: "700" }],
        "body-strong": ["17px", { lineHeight: "1.24", letterSpacing: "-0.374px", fontWeight: "600" }],
        "body-apple": ["17px", { lineHeight: "1.47", letterSpacing: "-0.374px", fontWeight: "400" }],
        "button-pill": ["17px", { lineHeight: "1.0", letterSpacing: "-0.374px", fontWeight: "400" }],
        "dense-link": ["17px", { lineHeight: "2.41", letterSpacing: "0px", fontWeight: "400" }],
        "caption-apple": ["14px", { lineHeight: "1.43", letterSpacing: "-0.224px", fontWeight: "400" }],
        "caption-strong": ["14px", { lineHeight: "1.29", letterSpacing: "-0.224px", fontWeight: "600" }],
        "button-large": ["18px", { lineHeight: "1.0", letterSpacing: "0px", fontWeight: "300" }],
        "button-utility": ["14px", { lineHeight: "1.29", letterSpacing: "-0.224px", fontWeight: "400" }],
        "fine-print": ["12px", { lineHeight: "1.2", letterSpacing: "-0.12px", fontWeight: "400" }],
        "micro-legal": ["10px", { lineHeight: "1.3", letterSpacing: "-0.08px", fontWeight: "400" }],
        "nav-link": ["12px", { lineHeight: "1.2", letterSpacing: "-0.12px", fontWeight: "400" }],
      },
      fontFamily: {
        sans: [
          "SF Pro Text",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        display: [
          "SF Pro Display",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
