"use client"

import { differenceInDays } from "date-fns"
import { RenewalCard } from "~/subscription/components/renewal-card"
import { SameDayUpcomingRenewalsBanner } from "~/subscription/components/same-day-upcoming-renewals-banner"
import { UpcomingRenewalsDisplayEmpty } from "~/subscription/components/upcoming-renewals-display-empty"
import { UpcomingRenewalsFiltersForm } from "~/subscription/components/upcoming-renewals-filter-form"
import {
  BUTTON_CLASS_NAME,
  IMMINENT_RENEWAL_DAYS,
  INPUT_CLASS_NAME,
  SAME_DAY_WARNING_THRESHOLD,
} from "~/subscription/constants/subscription-constants"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import { useMockRenewals } from "~/subscription/hooks/use-mock-renewals"
import { computeSameDayWarningRenewals } from "~/subscription/utils/subscription-utils"
import type { UpcomingRenewalsFilters } from "~/subscription/validations/subscription-filter-validations"

export function UpcomingRenewalsPage() {
  const { lookaheadDays, setLookaheadDays } = useDisplayPreferences()

  const { renewals } = useMockRenewals(lookaheadDays)

  const today = new Date()

  // Annotate each renewal with urgency info
  const renewalsWithUrgency = renewals.map((renewal) => {
    const daysUntilRenewal = differenceInDays(
      renewal.nextBillingDate.nextBillingDate,
      today
    )
    return {
      renewal,
      daysUntilRenewal,
      isImminent: daysUntilRenewal <= IMMINENT_RENEWAL_DAYS,
    }
  })

  const sameDayWarningDates = computeSameDayWarningRenewals(
    renewals,
    SAME_DAY_WARNING_THRESHOLD
  )

  const initialFilters: UpcomingRenewalsFilters = {
    lookAheadDays: lookaheadDays,
  }

  const applyFilters = (filters: UpcomingRenewalsFilters) => {
    setLookaheadDays(filters.lookAheadDays)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Upcoming Renewals</h1>

      {sameDayWarningDates.length > 0 && (
        <SameDayUpcomingRenewalsBanner warningDates={sameDayWarningDates} />
      )}

      <UpcomingRenewalsFiltersForm
        applyFilters={applyFilters}
        initialFilters={initialFilters}
        inputClassName={INPUT_CLASS_NAME}
        buttonClassName={BUTTON_CLASS_NAME}
      />

      {renewals.length === 0 ? (
        <UpcomingRenewalsDisplayEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renewalsWithUrgency.map(({ renewal, isImminent }) => (
            <RenewalCard
              key={renewal.subscription.id}
              renewal={renewal}
              isImminent={isImminent}
            />
          ))}
        </div>
      )}
    </div>
  )
}
