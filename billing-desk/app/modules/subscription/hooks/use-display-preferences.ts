import { create } from "zustand"
import {
  DEFAULT_DISPLAY_STYLE,
  DEFAULT_LOOKAHEAD_DAYS,
} from "~/subscription/constants/subscription-constants"
import type {
  DisplayStyle,
  LookAheadDays,
} from "~/subscription/types/subscription-types"

/**
 * Display preferences interface for subscription views
 */
interface DisplayPreferences {
  displayStyle: DisplayStyle
  lookaheadDays: LookAheadDays
  setDisplayStyle: (style: DisplayStyle) => void
  setLookaheadDays: (days: LookAheadDays) => void
}

/**
 * Zustand store for managing display preferences across subscription views
 */
export const useDisplayPreferences = create<DisplayPreferences>((set) => ({
  displayStyle: DEFAULT_DISPLAY_STYLE,
  lookaheadDays: DEFAULT_LOOKAHEAD_DAYS,
  setDisplayStyle: (style) => set({ displayStyle: style }),
  setLookaheadDays: (days) => set({ lookaheadDays: days }),
}))
