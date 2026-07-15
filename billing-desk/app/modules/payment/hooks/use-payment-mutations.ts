import type { UseMutationResult } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { simulateAcceptRequestToPay } from "~/payment/actions/payment-actions"
import type { SimulateAcceptRequestToPayRequest } from "~/payment/types/payment-requests"
import type { ApiError } from "~/shared/types/api-error-types"

/**
 * Mutation hook for simulating an accepted request-to-pay.
 *
 * Usage:
 *   const { mutate, isPending } = useSimulateAcceptRequestToPay()
 *   mutate({ timedAccountNumber, transactionAmount, connectorId })
 */
export function useSimulateAcceptRequestToPay(): UseMutationResult<
  void,
  ApiError,
  SimulateAcceptRequestToPayRequest
> {
  return useMutation<void, ApiError, SimulateAcceptRequestToPayRequest>({
    mutationFn: (request) => simulateAcceptRequestToPay(request),
  })
}
