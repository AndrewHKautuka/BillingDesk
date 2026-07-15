import type { UseMutationResult } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { processDueToday } from "~/payment/actions/checkout-actions"
import type { ProcessSubscriptionsResponse } from "~/payment/types/checkout-responses"
import type { ApiError } from "~/shared/types/api-error-types"

/**
 * Mutation hook for triggering the process-due-today checkout endpoint.
 *
 * Usage:
 *   const { mutate, isPending } = useProcessDueToday()
 *   mutate()
 */
export function useProcessDueToday(): UseMutationResult<
  ProcessSubscriptionsResponse,
  ApiError,
  void
> {
  return useMutation<ProcessSubscriptionsResponse, ApiError, void>({
    mutationFn: () => processDueToday(),
  })
}
