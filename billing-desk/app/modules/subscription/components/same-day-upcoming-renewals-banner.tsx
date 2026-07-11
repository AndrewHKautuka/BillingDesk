import { AlertTriangleIcon } from "lucide-react"
import { formatDate } from "~/shared/utils/date-formatters"
import type { Renewal } from "~/subscription/types/subscription-model"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SameDayUpcomingRenewalsBannerProps {
  /** Array of [dateString, Renewal[]] tuples representing renewals grouped by date. */
  warningDates: [string, Renewal[]][]
}

export function SameDayUpcomingRenewalsBanner({
  warningDates,
}: SameDayUpcomingRenewalsBannerProps) {
  return (
    <Alert className="gap-1 rounded-lg border border-warning-border bg-warning text-warning-foreground">
      <AlertTriangleIcon className="mt-0.5 size-5 shrink-0" />

      <AlertTitle className="text-lg font-semibold">
        Multiple Upcoming Renewals on the Same Day
      </AlertTitle>

      <AlertDescription className="text-warning-muted-foreground">
        <ul className="mt-1 list-inside list-disc">
          {warningDates.map(([dateString, renewals]) => (
            <li key={dateString}>
              <strong>{formatDate(new Date(dateString))}</strong>:{" "}
              {renewals.length} subscriptions renewing
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
