"use client"

import { differenceInDays } from "date-fns"
import { UpcomingRenewalsDisplayEmpty } from "~/subscription/components/empties/upcoming-renewals-display-empty"
import { UpcomingRenewalsDisplayError } from "~/subscription/components/errors/upcoming-renewals-display-error"
import { RenewalCard } from "~/subscription/components/renewal-card"
import { SameDayUpcomingRenewalsBanner } from "~/subscription/components/same-day-upcoming-renewals-banner"
import { UpcomingRenewalsDisplaySkeleton } from "~/subscription/components/skeletons/upcoming-renewals-display"
import { UpcomingRenewalsFiltersForm } from "~/subscription/components/upcoming-renewals-filter-form"
import {
  BUTTON_CLASS_NAME,
  IMMINENT_RENEWAL_DAYS,
  INPUT_CLASS_NAME,
  SAME_DAY_WARNING_THRESHOLD,
} from "~/subscription/constants/subscription-constants"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import { useUpcomingRenewals } from "~/subscription/hooks/use-subscription-queries"
import { computeSameDayWarningRenewals } from "~/subscription/utils/subscription-utils"
import type { UpcomingRenewalsFilters } from "~/subscription/validations/subscription-filter-validations"

export function UpcomingRenewalsPage() {
  const { lookaheadDays, setLookaheadDays } = useDisplayPreferences()

  const { data, isLoading, isError, error, refetch } =
    useUpcomingRenewals(lookaheadDays)

  const renewals = data ?? []

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

      {!isLoading && sameDayWarningDates.length > 0 && (
        <SameDayUpcomingRenewalsBanner warningDates={sameDayWarningDates} />
      )}

      <UpcomingRenewalsFiltersForm
        applyFilters={applyFilters}
        initialFilters={initialFilters}
        inputClassName={INPUT_CLASS_NAME}
        buttonClassName={BUTTON_CLASS_NAME}
      />

      {isLoading ? (
        <UpcomingRenewalsDisplaySkeleton />
      ) : isError ? (
        <UpcomingRenewalsDisplayError
          error={error}
          refetchRenewals={refetch}
          buttonClassName={BUTTON_CLASS_NAME}
        />
      ) : renewals.length === 0 ? (
        <UpcomingRenewalsDisplayEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
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
