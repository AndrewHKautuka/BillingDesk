export const CHECKOUT_KEYS = {
  all: ["checkout"] as const,
  processDueToday: () => [...CHECKOUT_KEYS.all, "due-today"] as const,
}
