import { formatCurrency } from "~/shared/utils/format-utils"
import type {
  Renewal,
  Subscription,
} from "~/subscription/types/subscription-model"

export function calculateMonthlyCost(subscriptions: Subscription[]): string {
  // TODO: move calculation to API to resolve multiple currencies into MWK
  // Calculate potential savings: monthly cost of all given subscriptions
  const potentialSavingsAmount = subscriptions.reduce((sum, sub) => {
    const monthlyCost = sub.billingCycle === "yearly" ? sub.cost / 12 : sub.cost
    return sum + monthlyCost
  }, 0)

  return formatTotalMonthlySpending(potentialSavingsAmount)
}

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
