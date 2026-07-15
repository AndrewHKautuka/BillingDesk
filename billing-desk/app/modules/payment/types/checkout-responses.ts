import type { SubscriptionResponse } from "~/subscription/types/subscription-responses"

/**
 * Response type for POST /api/checkout/process-due-today
 */
export interface ProcessSubscriptionsResponse {
  subscriptions: SubscriptionResponse[]
  transactionAmount: number
  timedAccountNumber: string
  expiryDate: string
}
