import type { UseMutationResult } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ApiError } from "~/shared/types/api-error-types"
import {
  createSubscription,
  deleteSubscription,
  toggleSubscriptionStatus,
  updateSubscription,
} from "~/subscription/actions/subscription-actions"
import {
  MONTHLY_TOTAL_KEYS,
  SUBSCRIPTION_KEYS,
} from "~/subscription/constants/subscription-query-constants"
import {
  monthlyTotalQueryOptions,
  subscriptionQueryOptions,
  subscriptionsQueryOptions,
} from "~/subscription/queries/subscription-queries"
import type { Subscription } from "~/subscription/types/subscription-model"
import {
  mapSubscriptionFormDataToSubscriptionCreateRequest,
  mapSubscriptionFormDataToSubscriptionUpdateRequest,
  mapSubscriptionResponseToSubscription,
} from "~/subscription/utils/mappers"
import type {
  CreateSubscriptionFormData,
  UpdateSubscriptionFormData,
} from "~/subscription/validations/subscription-validations"

/**
 * Mutation hook for creating a new subscription.
 * Maps CreateSubscriptionFormData to a CreateSubscriptionRequest DTO,
 * calls the API, and maps the response back to the Subscription domain model.
 * On success, invalidates the "subscriptions" and "monthly-total" query caches.
 */
export function useCreateSubscription(): UseMutationResult<
  Subscription,
  ApiError,
  CreateSubscriptionFormData
> {
  const queryClient = useQueryClient()

  return useMutation<Subscription, ApiError, CreateSubscriptionFormData>({
    mutationFn: async (formData: CreateSubscriptionFormData) => {
      const request =
        mapSubscriptionFormDataToSubscriptionCreateRequest(formData)

      const response = await createSubscription(request)

      return mapSubscriptionResponseToSubscription(response)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionsQueryOptions().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: monthlyTotalQueryOptions().queryKey,
      })
    },
  })
}

/**
 * Mutation hook for updating an existing subscription.
 * Maps UpdateSubscriptionFormData to an UpdateSubscriptionRequest DTO,
 * calls the API, and maps the response back to the Subscription domain model.
 * On success, invalidates the "subscriptions", "subscriptions/{id}", and "monthly-total" query caches.
 */
export function useUpdateSubscription(): UseMutationResult<
  Subscription,
  ApiError,
  {
    id: string
    data: UpdateSubscriptionFormData
  }
> {
  const queryClient = useQueryClient()

  return useMutation<
    Subscription,
    ApiError,
    {
      id: string
      data: UpdateSubscriptionFormData
    }
  >({
    mutationFn: async ({ id, data }) => {
      const request = mapSubscriptionFormDataToSubscriptionUpdateRequest(data)

      const response = await updateSubscription(id, request)

      return mapSubscriptionResponseToSubscription(response)
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: subscriptionsQueryOptions().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: subscriptionQueryOptions(id).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: monthlyTotalQueryOptions().queryKey,
      })
    },
  })
}

/**
 * Mutation hook for toggling a subscription's active/inactive status.
 * Implements optimistic updates: immediately reflects the toggled status in the
 * cache before the API responds, and rolls back on error.
 * On success, updates the cache with the actual API response and invalidates
 * the "subscriptions" and "monthly-total" query caches.
 */
export function useToggleSubscriptionStatus(): UseMutationResult<
  Subscription,
  ApiError,
  string
> {
  const queryClient = useQueryClient()

  return useMutation<
    Subscription,
    ApiError,
    string,
    {
      previousSubscriptions: Subscription[] | undefined
    }
  >({
    mutationFn: async (id: string) => {
      const response = await toggleSubscriptionStatus(id)

      return mapSubscriptionResponseToSubscription(response)
    },

    onMutate: async (id: string) => {
      // Cancel any outgoing refetches to avoid overwriting the optimistic update
      await queryClient.cancelQueries({
        queryKey: SUBSCRIPTION_KEYS.all,
      })

      // Snapshot the current cache value for potential rollback
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(
        SUBSCRIPTION_KEYS.all
      )

      // Optimistically toggle the status in the cache
      queryClient.setQueriesData<Subscription[]>(
        {
          queryKey: SUBSCRIPTION_KEYS.all,
        },
        (old) =>
          old?.map((sub) =>
            sub.id === id
              ? {
                  ...sub,
                  status: sub.status === "active" ? "inactive" : "active",
                }
              : sub
          )
      )

      return {
        previousSubscriptions,
      }
    },

    onSuccess: (subscription) => {
      // Replace the optimistic entry with the actual response from the server
      queryClient.setQueriesData<Subscription[]>(
        {
          queryKey: SUBSCRIPTION_KEYS.all,
        },
        (old) =>
          old?.map((sub) => (sub.id === subscription.id ? subscription : sub))
      )
    },

    onError: (_err, _id, context) => {
      // Roll back to the snapshot if the mutation fails
      if (context?.previousSubscriptions !== undefined) {
        queryClient.setQueryData(
          SUBSCRIPTION_KEYS.all,
          context.previousSubscriptions
        )
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: SUBSCRIPTION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: MONTHLY_TOTAL_KEYS.monthlyTotal(),
      })
    },
  })
}

/**
 * Mutation hook for deleting a subscription by ID.
 * On success, invalidates the "subscriptions" and "monthly-total" query caches.
 */
export function useDeleteSubscription(): UseMutationResult<
  void,
  ApiError,
  string
> {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: async (id: string) => {
      await deleteSubscription(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionsQueryOptions().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: monthlyTotalQueryOptions().queryKey,
      })
    },
  })
}
