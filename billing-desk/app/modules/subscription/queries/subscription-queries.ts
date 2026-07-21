import { queryOptions } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import {
  MONTHLY_COST_KEYS,
  MONTHLY_TOTAL_KEYS,
  RENEWAL_KEYS,
  SUBSCRIPTION_KEYS,
} from "~/subscription/constants/subscription-query-constants"
import {
  fetchMonthlyCost,
  fetchMonthlyTotal,
  fetchSubscription,
  fetchSubscriptions,
  fetchUpcomingRenewals,
} from "~/subscription/data/subscription-data"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type {
  Renewal,
  Subscription,
} from "~/subscription/types/subscription-model"
import type { MonthlyTotalResponse } from "~/subscription/types/subscription-responses"
import {
  mapRenewalResponseToRenewal,
  mapSubscriptionResponseToSubscription,
} from "~/subscription/utils/mappers"

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

/**
 * Query options factory for fetching upcoming renewals within the given number of days.
 */
export const upcomingRenewalsQueryOptions = (days: number) =>
  queryOptions<Renewal[], ApiError>({
    queryKey: RENEWAL_KEYS.upcomingWithin(days),
    queryFn: async () => {
      const responses = await fetchUpcomingRenewals(days)

      return responses.map(mapRenewalResponseToRenewal)
    },
  })

/**
 * Query options factory for fetching the monthly total cost.
 */
export const monthlyTotalQueryOptions = () =>
  queryOptions<MonthlyTotalResponse, ApiError>({
    queryKey: MONTHLY_TOTAL_KEYS.monthlyTotal(),
    queryFn: () => fetchMonthlyTotal(),
  })

/**
 * Query options factory for calculating the monthly cost in MWK for a specific
 * set of subscriptions identified by their IDs. Skips the query when the list
 * is empty.
 */
export const monthlyCostQueryOptions = (ids: string[]) =>
  queryOptions<MonthlyTotalResponse, ApiError>({
    queryKey: MONTHLY_COST_KEYS.monthlyCost(ids),
    queryFn: () => fetchMonthlyCost(ids),
    enabled: ids.length > 0,
  })
