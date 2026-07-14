import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { AlertCircleIcon } from "lucide-react"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MonthlySpendingCardErrorProps {
  error: ApiError
  isSubscriptionsError: boolean
  refetchSubscriptions: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Subscription[], ApiError>>
  buttonClassName?: string
}

export function MonthlySpendingCardError({
  error,
  isSubscriptionsError,
  refetchSubscriptions,
  buttonClassName,
}: MonthlySpendingCardErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="border-destructive bg-destructive/10"
    >
      <AlertCircleIcon className="size-5 shrink-0" />

      <AlertTitle className="font-semibold">
        Failed to load monthly spending
      </AlertTitle>

      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>

      {!isSubscriptionsError && (
        <AlertAction>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",
              buttonClassName
            )}
            onClick={() => refetchSubscriptions()}
          >
            Retry
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
