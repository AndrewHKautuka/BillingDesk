import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type {
  MonthlyTotalResponse,
  RenewalResponse,
  SubscriptionResponse,
} from "~/subscription/types/subscription-responses"

import apiClient from "@/lib/axios-client"

export async function fetchSubscriptions(
  status?: SubscriptionStatus
): Promise<SubscriptionResponse[]> {
  const response = await apiClient.get<SubscriptionResponse[]>(
    "/subscriptions",
    {
      params: {
        status,
      },
    }
  )

  return response.data
}

export async function fetchSubscription(
  id: string
): Promise<SubscriptionResponse> {
  const response = await apiClient.get<SubscriptionResponse>(
    `/subscriptions/${id}`
  )

  return response.data
}

export async function fetchUpcomingRenewals(
  days?: number
): Promise<RenewalResponse[]> {
  const response = await apiClient.get<RenewalResponse[]>(
    "/subscriptions/upcoming",
    {
      params: {
        days,
      },
    }
  )

  return response.data
}

export async function fetchMonthlyTotal(): Promise<MonthlyTotalResponse> {
  const response = await apiClient.get<MonthlyTotalResponse>(
    "/subscriptions/monthly-total"
  )

  return response.data
}
