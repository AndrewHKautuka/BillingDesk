import type { ProcessSubscriptionsResponse } from "~/payment/types/checkout-responses"

import apiClient from "@/lib/axios-client"

/**
 * Triggers processing of all subscriptions due for billing today.
 * Maps to POST /api/checkout/process-due-today.
 */
export async function processDueToday(): Promise<ProcessSubscriptionsResponse> {
  const response = await apiClient.post<ProcessSubscriptionsResponse>(
    "/checkout/process-due-today"
  )

  return response.data
}
