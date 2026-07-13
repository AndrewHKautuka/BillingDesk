import type { ApiError } from "~/shared/types/api-error-types"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type { SubscriptionResponse } from "~/subscription/types/subscription-responses"

import apiClient from "@/lib/axios-client"

export async function fetchSubscriptions(
  status?: SubscriptionStatus
): Promise<SubscriptionResponse[] | ApiError> {
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
): Promise<SubscriptionResponse | ApiError> {
  const response = await apiClient.get<SubscriptionResponse>(
    `/subscriptions/${id}`
  )

  return response.data
}
