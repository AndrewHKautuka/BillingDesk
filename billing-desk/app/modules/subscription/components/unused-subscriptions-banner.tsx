import { AlertTriangleIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UnusedSubscriptionsBannerProps {
  /** Number of inactive subscriptions. Banner is hidden when count <= UNUSED_WARNING_THRESHOLD. */
  count: number
  /** Pre-formatted potential monthly savings string, e.g. "$12.50". */
  potentialSavings: string
}

export function UnusedSubscriptionsBanner({
  count,
  potentialSavings,
}: UnusedSubscriptionsBannerProps) {
  return (
    <Alert className="gap-1 rounded-lg border border-warning-border bg-warning text-warning-foreground">
      <AlertTriangleIcon className="mt-0.5 size-5 shrink-0" />

      <AlertTitle className="text-lg font-semibold">
        Savings Opportunity
      </AlertTitle>

      <AlertDescription className="text-warning-muted-foreground">
        You have {count} unused subscriptions. Potential savings:{" "}
        <strong>{potentialSavings}/month</strong>.
      </AlertDescription>
    </Alert>
  )
}
