import type { UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import {
  subscriptionQueryOptions,
  subscriptionsQueryOptions,
} from "~/subscription/queries/subscription-queries"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type { Subscription } from "~/subscription/types/subscription-model"

/**
 * Query hook to fetch a list of subscriptions, optionally filtered by status.
 * Maps SubscriptionResponse DTOs to Subscription domain models.
 */
export function useSubscriptions(
  status?: SubscriptionStatus
): UseQueryResult<Subscription[], ApiError> {
  return useQuery(subscriptionsQueryOptions(status))
}

/**
 * Query hook to fetch a single subscription by ID.
 * Maps a SubscriptionResponse DTO to a Subscription domain model.
 */
export function useSubscription(
  id: string
): UseQueryResult<Subscription, ApiError> {
  return useQuery(subscriptionQueryOptions(id))
}
