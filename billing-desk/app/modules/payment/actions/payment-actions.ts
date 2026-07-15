import type { SimulateAcceptRequestToPayRequest } from "~/payment/types/payment-requests"

import apiClient from "@/lib/axios-client"

/**
 * Simulates accepting a request-to-pay for the given timed account number.
 * Maps to POST /api/payment/simulate/accept-request-to-pay.
 *
 * Returns void on success (204 No Content).
 */
export async function simulateAcceptRequestToPay(
  request: SimulateAcceptRequestToPayRequest
): Promise<void> {
  await apiClient.post("/payment/simulate/accept-request-to-pay", request)
}
