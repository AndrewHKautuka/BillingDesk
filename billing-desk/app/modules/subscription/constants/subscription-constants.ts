/**
 * Number of inactive subscriptions required to trigger the unused subscriptions warning banner.
 * When inactive subscriptions exceed this threshold, a warning is displayed showing potential savings.
 */
export const UNUSED_WARNING_THRESHOLD = 3

/**
 * Default display style for the subscription dashboard.
 * Users can toggle between list and card-grid views, with card-grid as the default.
 */
export const DEFAULT_DISPLAY_STYLE = ["card-grid"] as const

/**
 * Available display styles for the subscription dashboard.
 * - "list": Table/list view with columns
 * - "card-grid": Grid of subscription cards
 */
export const DISPLAY_STYLES = [["list"], ["card-grid"]] as const

/**
 * Number of days within which a renewal is considered imminent and highlighted in red.
 * Renewals with a next billing date within this many days will receive urgent visual styling.
 */
export const IMMINENT_RENEWAL_DAYS = 2

/**
 * Minimum number of subscriptions renewing on the same calendar day to trigger the
 * same-day renewals warning banner.
 */
export const SAME_DAY_WARNING_THRESHOLD = 3

/**
 * Default lookahead period (in days) for the renewals view.
 * Controls how far into the future upcoming renewals are fetched and displayed.
 */
export const DEFAULT_LOOKAHEAD_DAYS = 7 as const

/**
 * Available lookahead period options (in days) for the renewals view dropdown.
 */
export const LOOKAHEAD_OPTIONS = [3, 7, 14, 30] as const

export const INPUT_CLASS_NAME = "rounded-md" as const
export const DIALOG_TRIGGER_CLASS_NAME = "rounded-md" as const
export const BUTTON_CLASS_NAME = "rounded-md" as const
