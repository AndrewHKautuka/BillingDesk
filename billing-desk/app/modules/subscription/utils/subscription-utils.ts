import { formatCurrency } from "~/shared/utils/format-utils"
import type {
  Renewal,
  Subscription,
} from "~/subscription/types/subscription-model"

export function calculateMonthlyCost(subscriptions: Subscription[]): string {
  // TODO: fix up calculation for multiple currencies
  // Calculate potential savings: monthly cost of all given subscriptions
  const potentialSavingsAmount = subscriptions.reduce((sum, sub) => {
    const monthlyCost = sub.billingCycle === "yearly" ? sub.cost / 12 : sub.cost
    return sum + monthlyCost
  }, 0)

  // Format potential savings - use the first inactive subscription's currency if available,
  // otherwise default to USD. The banner just shows one value so we pick the first currency.
  const savingsCurrency =
    subscriptions.length > 0 ? subscriptions[0].currency.toUpperCase() : "USD"
  const formattedSavings = formatCurrency(
    potentialSavingsAmount,
    savingsCurrency
  )
  const potentialSavingsStr = formattedSavings
    ? `${formattedSavings[0]}${formattedSavings[1]}`
    : `${potentialSavingsAmount.toFixed(2)}`

  return potentialSavingsStr
}

export function formatTotalMonthlySpending(total: number) {
  const formattedTotal = formatCurrency(total, "USD")
  const totalMonthlyDisplay = formattedTotal
    ? `${formattedTotal[0]}${formattedTotal[1]}`
    : `$${total.toFixed(2)}`

  return totalMonthlyDisplay
}

export function computeSameDayWarningRenewals(
  renewals: Renewal[],
  warningThreshold: number
): [string, Renewal[]][] {
  const sameDayRenewals = renewals.reduce<[string, Renewal[]][]>(
    (acc, renewal) => {
      const dateLabel = renewal.nextBillingDate.nextBillingDate.toDateString()

      let group = acc.find(([date]) => date === dateLabel)

      if (!group) {
        group = [dateLabel, []]
        acc.push(group)
      }

      const [, renewals] = group
      renewals.push(renewal)
      return acc
    },
    []
  )

  const warningDates = sameDayRenewals.filter(
    ([, renewals]) => renewals.length >= warningThreshold
  )

  return warningDates
}
