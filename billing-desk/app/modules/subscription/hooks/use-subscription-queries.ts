import type { UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import {
  monthlyCostQueryOptions,
  monthlyTotalQueryOptions,
  subscriptionQueryOptions,
  subscriptionsQueryOptions,
  upcomingRenewalsQueryOptions,
} from "~/subscription/queries/subscription-queries"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type {
  Renewal,
  Subscription,
} from "~/subscription/types/subscription-model"
import type { MonthlyTotalResponse } from "~/subscription/types/subscription-responses"

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

/**
 * Query hook to fetch upcoming renewals within the given number of days.
 * Maps RenewalResponse DTOs to Renewal domain models.
 */
export function useUpcomingRenewals(
  days: number
): UseQueryResult<Renewal[], ApiError> {
  return useQuery(upcomingRenewalsQueryOptions(days))
}

/**
 * Query hook to fetch the monthly total cost.
 * Returns the MonthlyTotalResponse directly (no mapping needed).
 *
 * The query is tied to the subscriptions data update timestamp so it is
 * automatically invalidated (goes stale) whenever subscriptions are
 * refetched, including after recovering from an error.
 */
export function useMonthlyTotal(): UseQueryResult<
  MonthlyTotalResponse,
  ApiError
> {
  const { dataUpdatedAt } = useSubscriptions()
  return useQuery(monthlyTotalQueryOptions(dataUpdatedAt))
}

/**
 * Query hook to calculate the monthly cost in MWK for a specific set of
 * subscriptions identified by their IDs. The query is disabled when the list
 * is empty.
 */
export function useMonthlyCost(
  ids: string[]
): UseQueryResult<MonthlyTotalResponse, ApiError> {
  return useQuery(monthlyCostQueryOptions(ids))
}
