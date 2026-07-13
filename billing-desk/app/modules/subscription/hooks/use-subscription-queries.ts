import type { UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import {
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
 */
export function useMonthlyTotal(): UseQueryResult<
  MonthlyTotalResponse,
  ApiError
> {
  return useQuery(monthlyTotalQueryOptions())
}
