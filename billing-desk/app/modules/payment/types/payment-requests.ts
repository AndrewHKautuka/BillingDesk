/**
 * Request body for POST /api/payment/simulate/accept-request-to-pay
 */
export interface SimulateAcceptRequestToPayRequest {
  timedAccountNumber: string
  transactionAmount: number
  connectorId: number
}
