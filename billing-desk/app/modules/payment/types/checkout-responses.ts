/**
 * Response type for POST /api/checkout/process-due-today
 */
export interface RequestForPayementResponse {
  merchantAccountNumber: number
  timedAccountNumber: string
  expiryDate: string
  expiryInMinutes: number
}
