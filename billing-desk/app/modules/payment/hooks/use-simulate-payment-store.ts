import { create } from "zustand"

/**
 * Global state for the simulate-payment form.
 * Persists the selected connector across re-renders and component unmounts.
 */
interface SimulatePaymentStore {
  connectorId: number | undefined
  setConnectorId: (id: number | undefined) => void
}

export const useSimulatePaymentStore = create<SimulatePaymentStore>((set) => ({
  connectorId: undefined,
  setConnectorId: (id) => set({ connectorId: id }),
}))
