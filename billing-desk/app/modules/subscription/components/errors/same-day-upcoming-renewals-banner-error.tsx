import { AlertCircleIcon } from "lucide-react"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SameDayUpcomingRenewalsBannerErrorProps {
  error: ApiError
}

export function SameDayUpcomingRenewalsBannerError({
  error,
}: SameDayUpcomingRenewalsBannerErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="border-destructive bg-destructive/10"
    >
      <AlertCircleIcon className="size-5 shrink-0" />

      <AlertTitle className="font-semibold">
        Failed to check for same-day renewals
      </AlertTitle>

      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
    </Alert>
  )
}
