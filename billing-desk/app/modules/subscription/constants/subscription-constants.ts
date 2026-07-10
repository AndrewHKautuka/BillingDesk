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

export const INPUT_CLASS_NAME = "rounded-md" as const
export const DIALOG_TRIGGER_CLASS_NAME = "rounded-md" as const
export const BUTTON_CLASS_NAME = "rounded-md" as const
