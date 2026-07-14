import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import type { Renewal } from "~/subscription/types/subscription-model"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UpcomingRenewalsDisplayErrorProps {
  error: ApiError
  refetchRenewals: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Renewal[], ApiError>>
  buttonClassName?: string
}

export function UpcomingRenewalsDisplayError({
  error,
  refetchRenewals,
  buttonClassName,
}: UpcomingRenewalsDisplayErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="justify-items-center gap-4 border-destructive bg-destructive/10 p-8 text-center"
    >
      <AlertTitle className="text-lg font-semibold">
        Failed to load upcoming renewals
      </AlertTitle>
      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
      <Button
        className={cn("w-fit", buttonClassName)}
        onClick={() => refetchRenewals()}
      >
        Retry
      </Button>
    </Alert>
  )
}
