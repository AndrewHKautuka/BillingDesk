import type { ProcessSubscriptions } from "~/payment/types/checkout-models"
import type { ProcessSubscriptionsResponse } from "~/payment/types/checkout-responses"
import { parseDateFromInput } from "~/shared/utils/date-formatters"
import { mapSubscriptionResponseToSubscription } from "~/subscription/utils/mappers"

/**
 * Maps a RequestForPayementResponse DTO to a RequestForPayement domain model.
 */
export function mapProcessSubscriptionsResponseToProcessSubscriptions(
  response: ProcessSubscriptionsResponse
): ProcessSubscriptions {
  return {
    ...response,
    subscriptions: response.subscriptions.map(
      mapSubscriptionResponseToSubscription
    ),
    expiryDate: parseDateFromInput(response.expiryDate),
  }
}
