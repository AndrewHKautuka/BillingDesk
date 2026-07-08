import { format, parseISO } from "date-fns"

/**
 * Format a date for display in the UI.
 * @param date - The date to format
 * @returns Formatted date string in "MMM d, yyyy" format (e.g., "Jan 15, 2024")
 */
export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy")
}

/**
 * Format a date for use in HTML date input fields.
 * @param date - The date to format
 * @returns Formatted date string in "yyyy-MM-dd" format (ISO date format)
 */
export function formatDateForInput(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

/**
 * Parse a date string from an HTML date input field.
 * @param dateString - The ISO date string to parse (format: "yyyy-MM-dd")
 * @returns Parsed Date object
 */
export function parseDateFromInput(dateString: string): Date {
  return parseISO(dateString)
}
