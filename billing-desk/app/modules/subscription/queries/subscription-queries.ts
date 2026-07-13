import { queryOptions } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import { SUBSCRIPTION_KEYS } from "~/subscription/constants/subscription-query-constants"
import {
  fetchSubscription,
  fetchSubscriptions,
} from "~/subscription/data/subscription-data"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type { Subscription } from "~/subscription/types/subscription-model"
import { mapSubscriptionResponseToSubscription } from "~/subscription/utils/mappers"

/**
 * Query options factory for fetching a list of subscriptions, optionally filtered by status.
 */
export const subscriptionsQueryOptions = (status?: SubscriptionStatus) =>
  queryOptions<Subscription[], ApiError>({
    queryKey: SUBSCRIPTION_KEYS.list(status),
    queryFn: async () => {
      const responses = await fetchSubscriptions(status)

      return responses.map(mapSubscriptionResponseToSubscription)
    },
  })

/**
 * Query options factory for fetching a single subscription by ID.
 */
export const subscriptionQueryOptions = (id: string) =>
  queryOptions<Subscription, ApiError>({
    queryKey: SUBSCRIPTION_KEYS.detail(id),
    queryFn: async () => {
      const response = await fetchSubscription(id)

      return mapSubscriptionResponseToSubscription(response)
    },
  })
