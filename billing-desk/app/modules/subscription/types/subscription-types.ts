import type {
  DISPLAY_STYLES,
  LOOKAHEAD_OPTIONS,
} from "~/subscription/constants/subscription-constants"

export type DisplayStyle = (typeof DISPLAY_STYLES)[number]
export type LookAheadDays = (typeof LOOKAHEAD_OPTIONS)[number]
