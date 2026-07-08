export const BILLING_CYCLE_OPTIONS = ["monthly", "yearly"] as const
export type BillingCycle = (typeof BILLING_CYCLE_OPTIONS)[number]

export const CURRENCY_OPTIONS = ["usd", "mwk", "eur"] as const
export type Currency = (typeof CURRENCY_OPTIONS)[number]

export const SUBSCRIPTION_STATUS_OPTIONS = ["active", "inactive"] as const
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS_OPTIONS)[number]
