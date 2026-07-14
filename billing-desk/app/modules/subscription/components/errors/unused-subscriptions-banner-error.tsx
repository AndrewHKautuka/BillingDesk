import { AlertCircleIcon } from "lucide-react"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UnusedSubscriptionsBannerErrorProps {
  error: ApiError
}

export function UnusedSubscriptionsBannerError({
  error,
}: UnusedSubscriptionsBannerErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="border-destructive bg-destructive/10"
    >
      <AlertCircleIcon className="size-5 shrink-0" />

      <AlertTitle className="font-semibold">
        Failed to load savings data
      </AlertTitle>

      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
    </Alert>
  )
}
