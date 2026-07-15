import type { RequestForPayementResponse } from "~/payment/types/checkout-responses"

import apiClient from "@/lib/axios-client"

/**
 * Triggers processing of all subscriptions due for billing today.
 * Maps to POST /api/checkout/process-due-today.
 */
export async function processDueToday(): Promise<RequestForPayementResponse> {
  const response = await apiClient.post<RequestForPayementResponse>(
    "/checkout/process-due-today"
  )

  return response.data
}
