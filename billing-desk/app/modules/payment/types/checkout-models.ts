/**
 * Response type for POST /api/checkout/process-due-today
 */
export interface RequestForPayement {
  merchantAccountNumber: number
  timedAccountNumber: string
  expiryDate: Date
  expiryInMinutes: number
}
