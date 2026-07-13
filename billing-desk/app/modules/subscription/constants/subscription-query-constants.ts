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
