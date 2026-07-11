import { addDays, addMonths, addYears, isAfter, isBefore } from "date-fns"
import { useMockSubscriptions } from "~/subscription/hooks/use-mock-subscriptions"
import type { BillingCycle } from "~/subscription/types/subscription-enums"
import type { Renewal } from "~/subscription/types/subscription-model"

function calculateNextBillingDate(
  startDate: Date,
  billingCycle: BillingCycle
): Date {
  const today = new Date()
  let nextDate = new Date(startDate)

  // Advance the date by one billing cycle at a time until it's in the future
  while (!isAfter(nextDate, today)) {
    if (billingCycle === "yearly") {
      nextDate = addYears(nextDate, 1)
    } else {
      nextDate = addMonths(nextDate, 1)
    }
  }

  return nextDate
}

export function useMockRenewals(lookaheadDays: number) {
  const today = new Date()
  const lookaheadEnd = addDays(today, lookaheadDays)

  const { subscriptions } = useMockSubscriptions()

  const renewals: Renewal[] = subscriptions
    .map((subscription) => {
      const nextBillingDate = calculateNextBillingDate(
        subscription.startDate,
        subscription.billingCycle
      )
      return {
        nextBillingDate: { nextBillingDate },
        subscription,
      }
    })
    .filter(({ nextBillingDate }) =>
      isBefore(nextBillingDate.nextBillingDate, lookaheadEnd)
    )

  return {
    renewals,
    isLoading: false,
  }
}
