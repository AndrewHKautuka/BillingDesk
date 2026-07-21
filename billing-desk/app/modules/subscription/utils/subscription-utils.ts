import { formatCurrency } from "~/shared/utils/format-utils"
import type { Renewal } from "~/subscription/types/subscription-model"

export function formatTotalMonthlySpending(total: number) {
  const formattedTotal = formatCurrency(total, "MWK")
  const totalMonthlyDisplay = formattedTotal
    ? `${formattedTotal[0]}${formattedTotal[1]}`
    : `$${total.toFixed(2)}`

  return totalMonthlyDisplay
}

export function computeSameDayWarningRenewals(
  renewals: Renewal[],
  warningThreshold: number
): [string, Renewal[]][] {
  const renewalsByDate = renewals.reduce<Map<string, Renewal[]>>(
    (acc, renewal) => {
      const dateKey = renewal.nextBillingDate.nextBillingDate.toDateString()

      if (!acc.has(dateKey)) {
        acc.set(dateKey, [])
      }

      acc.get(dateKey)!.push(renewal)
      return acc
    },
    new Map<string, Renewal[]>()
  )

  const warningDates = Array.from(renewalsByDate.entries()).filter(
    ([, renewals]) => renewals.length >= warningThreshold
  )

  return warningDates
}
