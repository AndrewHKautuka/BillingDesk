import { CalendarClockIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function RenewalsDisplayEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarClockIcon className="size-12 text-muted-foreground" />
        </EmptyMedia>

        <EmptyTitle className="font-semibold">No upcoming renewals</EmptyTitle>

        <EmptyDescription>
          None of your subscriptions renew within the applied filters. Try apply
          less restrictive filters, e.g. extending the lookahead period.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent />
    </Empty>
  )
}
