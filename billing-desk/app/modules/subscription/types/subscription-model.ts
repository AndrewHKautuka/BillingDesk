import type {
  BillingCycle,
  Currency,
  SubscriptionStatus,
} from "./subscription-enums"

export interface Subscription {
  id: string // uuid
  name: string
  cost: number
  currency: Currency
  billingCycle: BillingCycle
  startDate: Date
  status: SubscriptionStatus
  category: string
}
