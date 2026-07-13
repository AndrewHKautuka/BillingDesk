import type {
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
} from "~/subscription/types/subscription-requests"
import type { SubscriptionResponse } from "~/subscription/types/subscription-responses"

import apiClient from "@/lib/axios-client"

export async function createSubscription(
  data: CreateSubscriptionRequest
): Promise<SubscriptionResponse> {
  const response = await apiClient.post<SubscriptionResponse>(
    "/subscriptions",
    data
  )

  return response.data
}

export async function updateSubscription(
  id: string,
  data: UpdateSubscriptionRequest
): Promise<SubscriptionResponse> {
  const response = await apiClient.put<SubscriptionResponse>(
    `/subscriptions/${id}`,
    data
  )

  return response.data
}

export async function deleteSubscription(id: string): Promise<void> {
  await apiClient.delete(`/subscriptions/${id}`)
}

export async function toggleSubscriptionStatus(
  id: string
): Promise<SubscriptionResponse> {
  const response = await apiClient.patch<SubscriptionResponse>(
    `/subscriptions/${id}/toggle-status`
  )

  return response.data
}
