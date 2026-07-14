import type {
  BillingCycle,
  Currency,
  SubscriptionStatus,
} from "./subscription-enums"

export interface BillingDateResponse {
  nextBillingDate: string
}

export interface MonthlyTotalResponse {
  total: number
}

export interface SubscriptionResponse {
  id: string // uuid
  name: string
  cost: number
  currency: Currency
  billingCycle: BillingCycle
  startDate: string
  status: SubscriptionStatus
  category: string
}

export interface RenewalResponse {
  nextBillingDate: BillingDateResponse
  subscription: SubscriptionResponse
}
