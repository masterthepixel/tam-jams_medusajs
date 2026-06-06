"use client"

import { acceptTransferRequest, declineTransferRequest } from "@lib/data/orders"
import { Text } from "@medusajs/ui"
import { useState } from "react"

type TransferStatus = "pending" | "success" | "error"

const TransferActions = ({ id, token }: { id: string; token: string }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<{
    accept: TransferStatus | null
    decline: TransferStatus | null
  } | null>({
    accept: null,
    decline: null,
  })

  const acceptTransfer = async () => {
    setStatus({ accept: "pending", decline: null })
    setErrorMessage(null)

    const { success, error } = await acceptTransferRequest(id, token)

    if (error) setErrorMessage(error)
    setStatus({ accept: success ? "success" : "error", decline: null })
  }

  const declineTransfer = async () => {
    setStatus({ accept: null, decline: "pending" })
    setErrorMessage(null)

    const { success, error } = await declineTransferRequest(id, token)

    if (error) setErrorMessage(error)
    setStatus({ accept: null, decline: success ? "success" : "error" })
  }

  return (
    <div className="flex flex-col gap-y-4">
      {status?.accept === "success" && (
        <Text className="text-emerald-500">
          Order transferred successfully!
        </Text>
      )}
      {status?.decline === "success" && (
        <Text className="text-emerald-500">
          Order transfer declined successfully!
        </Text>
      )}
      {status?.accept !== "success" && status?.decline !== "success" && (
        <div className="flex gap-x-4">
          <button
            className="btn-pill"
            onClick={acceptTransfer}
            disabled={
              status?.accept === "pending" || status?.decline === "pending"
            }
          >
            {status?.accept === "pending" ? "Accepting…" : "Accept transfer"}
          </button>
          <button
            className="btn-pill-ghost"
            onClick={declineTransfer}
            disabled={
              status?.accept === "pending" || status?.decline === "pending"
            }
          >
            {status?.decline === "pending" ? "Declining…" : "Decline transfer"}
          </button>
        </div>
      )}
      {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
    </div>
  )
}

export default TransferActions
