import type { BillingCycle, Currency } from "./subscription-enums"

export interface CreateSubscriptionRequest {
  name: string
  cost: number
  currency: Currency
  billingCycle: BillingCycle
  startDate: Date
  category: string
}

export interface UpdateSubscriptionRequest {
  name: string
  cost: number
  currency: Currency
  billingCycle: BillingCycle
  startDate: Date
  category: string
}
