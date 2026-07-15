import { queryOptions } from "@tanstack/react-query"
import { processDueToday } from "~/payment/actions/checkout-actions"
import { CHECKOUT_KEYS } from "~/payment/constants/checkout-query-constants"
import type { ProcessSubscriptions } from "~/payment/types/checkout-models"
import { mapProcessSubscriptionsResponseToProcessSubscriptions } from "~/payment/utils/mappers"
import type { ApiError } from "~/shared/types/api-error-types"

/**
 * Query options for the process-due-today mutation endpoint.
 *
 * Exposed as queryOptions so callers can reference the stable queryKey
 * (e.g. for cache invalidation) and, if needed, prime the cache via
 * queryClient.fetchQuery / queryClient.ensureQueryData.
 */
export const processDueTodayQueryOptions = () =>
  queryOptions<ProcessSubscriptions, ApiError>({
    queryKey: CHECKOUT_KEYS.processDueToday(),
    queryFn: async () => {
      const response = await processDueToday()

      return mapProcessSubscriptionsResponseToProcessSubscriptions(response)
    },
  })
