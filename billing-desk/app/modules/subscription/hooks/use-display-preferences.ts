import { create } from "zustand"
import { DEFAULT_DISPLAY_STYLE } from "~/subscription/constants/subscription-constants"
import type { DisplayStyle } from "~/subscription/types/subscription-types"

/**
 * Display preferences interface for subscription views
 */
interface DisplayPreferences {
  displayStyle: DisplayStyle
  setDisplayStyle: (style: DisplayStyle) => void
}

/**
 * Zustand store for managing display preferences across subscription views
 */
export const useDisplayPreferences = create<DisplayPreferences>((set) => ({
  displayStyle: DEFAULT_DISPLAY_STYLE,
  setDisplayStyle: (style) => set({ displayStyle: style }),
}))
