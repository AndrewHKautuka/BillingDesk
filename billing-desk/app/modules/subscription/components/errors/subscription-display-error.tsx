import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubscriptionsDisplayErrorProps {
  error: ApiError
  refetchSubscriptions: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Subscription[], ApiError>>
  buttonClassName?: string
}

export function SubscriptionsDisplayError({
  error,
  refetchSubscriptions,
  buttonClassName,
}: SubscriptionsDisplayErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="justify-items-center gap-4 border-destructive bg-destructive/10 p-8 text-center"
    >
      <AlertTitle className="text-lg font-semibold">
        Failed to load subscriptions
      </AlertTitle>
      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
      <Button
        className={cn("w-fit", buttonClassName)}
        onClick={() => refetchSubscriptions()}
      >
        Retry
      </Button>
    </Alert>
  )
}
