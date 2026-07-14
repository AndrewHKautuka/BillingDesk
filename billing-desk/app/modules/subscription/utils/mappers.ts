import {
  formatDateForInput,
  parseDateFromInput,
} from "~/shared/utils/date-formatters"
import type {
  Renewal,
  Subscription,
} from "~/subscription/types/subscription-model"
import type {
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
} from "~/subscription/types/subscription-requests"
import type {
  RenewalResponse,
  SubscriptionResponse,
} from "~/subscription/types/subscription-responses"
import type {
  CreateSubscriptionFormData,
  UpdateSubscriptionFormData,
} from "~/subscription/validations/subscription-validations"

/**
 * Maps a SubscriptionResponse DTO to a Subscription domain model.
 */
export function mapSubscriptionResponseToSubscription(
  response: SubscriptionResponse
): Subscription {
  return {
    ...response,
    startDate: parseDateFromInput(response.startDate),
  }
}

/**
 * Maps a RenewalResponse DTO to a Renewal domain model.
 */
export function mapRenewalResponseToRenewal(
  response: RenewalResponse
): Renewal {
  return {
    nextBillingDate: {
      nextBillingDate: parseDateFromInput(
        response.nextBillingDate.nextBillingDate
      ),
    },
    subscription: mapSubscriptionResponseToSubscription(response.subscription),
  }
}

/**
 * Maps CreateSubscriptionFormData to a CreateSubscriptionRequest DTO.
 */
export function mapSubscriptionFormDataToSubscriptionCreateRequest(
  formData: CreateSubscriptionFormData
): CreateSubscriptionRequest {
  return {
    ...formData,
    startDate: formatDateForInput(formData.startDate),
  }
}

/**
 * Maps UpdateSubscriptionFormData to an UpdateSubscriptionRequest DTO.
 */
export function mapSubscriptionFormDataToSubscriptionUpdateRequest(
  formData: UpdateSubscriptionFormData
): UpdateSubscriptionRequest {
  return {
    ...formData,
    startDate: formatDateForInput(formData.startDate),
  }
}
