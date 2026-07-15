import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { AlertCircleIcon } from "lucide-react"
import type { ApiError } from "~/shared/types/api-error-types"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import type { Renewal } from "~/subscription/types/subscription-model"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DueTodaySubscriptionsListErrorProps {
  error: ApiError
  refetchRenewals: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Renewal[], ApiError>>
  buttonClassName?: string
}

export function DueTodaySubscriptionsListError({
  error,
  refetchRenewals,
  buttonClassName,
}: DueTodaySubscriptionsListErrorProps) {
  return (
    <Alert
      variant="destructive"
      className="border-destructive bg-destructive/10"
    >
      <AlertCircleIcon className="size-5 shrink-0" />

      <AlertTitle className="font-semibold">
        Failed to load today&apos;s subscriptions
      </AlertTitle>

      <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>

      <AlertAction>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",
            buttonClassName
          )}
          onClick={() => refetchRenewals()}
        >
          Retry
        </Button>
      </AlertAction>
    </Alert>
  )
}
