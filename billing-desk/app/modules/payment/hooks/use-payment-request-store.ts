import { create } from "zustand"
import type { ProcessSubscriptions } from "~/payment/types/checkout-models"

/**
 * Global state for the active payment request.
 * Persists the TAN, transaction amount, expiry date, and resolution status
 * across re-renders and navigation, independently of payment simulation.
 */
interface PaymentRequestStore {
  paymentRequest: ProcessSubscriptions | null
  isResolved: boolean
  setPaymentRequest: (request: ProcessSubscriptions) => void
  setResolved: (resolved: boolean) => void
  resetPaymentRequest: () => void
}

export const usePaymentRequestStore = create<PaymentRequestStore>((set) => ({
  paymentRequest: null,
  isResolved: false,
  setPaymentRequest: (request) =>
    set({
      paymentRequest: request,
      isResolved: false,
    }),
  setResolved: (resolved) =>
    set({
      isResolved: resolved,
    }),
  resetPaymentRequest: () =>
    set({
      paymentRequest: null,
      isResolved: false,
    }),
}))
