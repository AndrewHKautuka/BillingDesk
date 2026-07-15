import type { Subscription } from "~/subscription/types/subscription-model"

/**
 * Response type for POST /api/checkout/process-due-today
 */
export interface ProcessSubscriptions {
  subscriptions: Subscription[]
  transactionAmount: number
  timedAccountNumber: string
  expiryDate: Date
}
