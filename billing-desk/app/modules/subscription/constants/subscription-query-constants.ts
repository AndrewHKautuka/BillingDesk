import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"

export const SUBSCRIPTION_KEYS = {
  all: ["subscriptions"] as const,
  lists: () => [...SUBSCRIPTION_KEYS.all, "list"] as const,
  list: (status?: SubscriptionStatus) =>
    [
      ...SUBSCRIPTION_KEYS.lists(),
      {
        status,
      },
    ] as const,
  details: () => [...SUBSCRIPTION_KEYS.all, "detail"] as const,
  detail: (id: string) => [...SUBSCRIPTION_KEYS.details(), id] as const,
}

export const RENEWAL_KEYS = {
  all: ["renewals"] as const,
  upcoming: () => [...RENEWAL_KEYS.all, "upcoming"] as const,
  upcomingWithin: (days: number) => [...RENEWAL_KEYS.upcoming(), days] as const,
}

export const MONTHLY_TOTAL_KEYS = {
  monthlyTotal: () => ["monthly-total"] as const,
}

export const MONTHLY_COST_KEYS = {
  monthlyCost: (ids: string[]) => ["monthly-cost", ids] as const,
}
