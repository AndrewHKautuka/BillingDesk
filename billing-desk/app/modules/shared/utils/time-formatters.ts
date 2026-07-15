/**
 * Formats a seconds-remaining countdown as mm:ss.
 */
export function formatCountdown(secondsRemaining: number): string {
  const clamped = Math.max(0, secondsRemaining)
  const minutes = Math.floor(clamped / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (clamped % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}
