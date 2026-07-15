import type { RequestForPayement } from "~/payment/types/checkout-models"
import type { RequestForPayementResponse } from "~/payment/types/checkout-responses"
import { parseDateFromInput } from "~/shared/utils/date-formatters"

/**
 * Maps a RequestForPayementResponse DTO to a RequestForPayement domain model.
 */
export function mapRequestForPayementResponseToRequestForPayement(
  response: RequestForPayementResponse
): RequestForPayement {
  return {
    ...response,
    expiryDate: parseDateFromInput(response.expiryDate),
  }
}
