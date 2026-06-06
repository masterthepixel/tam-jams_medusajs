"use client"

import { clx } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clx("btn-pill w-full justify-center", className)}
      disabled={pending}
      aria-disabled={pending}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}
