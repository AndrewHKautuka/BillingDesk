import { create } from "zustand"

/**
 * Global state for the connector preference used in the simulate-payment form.
 * Persists the selected connector across re-renders and component unmounts.
 */
interface ConnectorPreferenceStore {
  connectorId: number | undefined
  setConnectorId: (id: number | undefined) => void
}

export const useConnectorPreferenceStore = create<ConnectorPreferenceStore>(
  (set) => ({
    connectorId: undefined,
    setConnectorId: (id) => set({ connectorId: id }),
  })
)
