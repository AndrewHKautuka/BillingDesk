import { AlertCircleIcon } from "lucide-react"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CheckoutPaymentCardErrorProps {
  error: ApiError
}

export function CheckoutPaymentCardError({
  error,
}: CheckoutPaymentCardErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="border-destructive bg-destructive/10"
    >
      <AlertCircleIcon className="size-5 shrink-0" />

      <AlertTitle className="font-semibold">Payment unavailable</AlertTitle>

      <AlertDescription>
        {getApiErrorMessage(error)}
        <br />
        Today&apos;s subscriptions must load successfully before a payment
        session can be requested.
      </AlertDescription>
    </Alert>
  )
}
