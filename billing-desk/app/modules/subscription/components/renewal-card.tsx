import { differenceInDays } from "date-fns"
import { Calendar1Icon, ClockIcon } from "lucide-react"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { Renewal } from "~/subscription/types/subscription-model"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RenewalCardProps {
  renewal: Renewal
  isImminent: boolean
}

export function RenewalCard({ renewal, isImminent }: RenewalCardProps) {
  const { subscription, nextBillingDate } = renewal
  const [currency, cost] = formatCurrency(
    subscription.cost,
    subscription.currency.toUpperCase()
  ) ?? ["", "N/A"]
  const billingPerUnit = `/${subscription.billingCycle === "monthly" ? "Mon" : "Year"}`

  const nextDate = nextBillingDate.nextBillingDate
  const today = new Date()
  const daysUntilRenewal = differenceInDays(nextDate, today)

  return (
    <Card
      className={cn(
        "transition-colors",
        isImminent && "border-red-500 bg-red-50 dark:bg-red-950/20"
      )}
    >
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle
          className={cn(
            "truncate text-base font-semibold sm:text-lg",
            isImminent && "text-red-600 dark:text-red-400"
          )}
          title={subscription.name}
        >
          {subscription.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row flex-wrap items-center gap-2">
            <span className="shrink-0 text-sm text-muted-foreground">
              Next billing:
            </span>
            <Badge
              variant="outline"
              className={cn(
                "font-semibold",
                isImminent && "border-red-500 text-red-600 dark:text-red-400"
              )}
            >
              <Calendar1Icon className="size-4" />
              <span>{formatDate(nextDate)}</span>
            </Badge>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2">
            <span className="shrink-0 text-sm text-muted-foreground">
              Days until renewal:
            </span>
            <Badge
              variant={isImminent ? "destructive" : "secondary"}
              className="font-semibold"
            >
              <ClockIcon className="size-4" />
              <span>
                {daysUntilRenewal === 0
                  ? "Today"
                  : daysUntilRenewal === 1
                    ? "1 day"
                    : `${daysUntilRenewal} days`}
              </span>
            </Badge>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2">
            <span className="shrink-0 text-sm text-muted-foreground">
              Billing cycle:
            </span>
            <span className="font-semibold capitalize">
              {subscription.billingCycle}
            </span>
          </div>

          {subscription.category && (
            <div className="flex flex-row flex-wrap items-center gap-2">
              <span className="shrink-0 text-sm text-muted-foreground">
                Category:
              </span>
              <span className="font-semibold">{subscription.category}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center gap-1">
          <span className="self-start text-xl font-extralight tracking-tight text-muted-foreground sm:text-2xl">
            {currency}
          </span>
          <span
            className={cn(
              "self-center py-1.5 text-3xl font-semibold tracking-tighter sm:text-4xl",
              isImminent && "text-red-600 dark:text-red-400"
            )}
          >
            {cost}
          </span>
          <span className="self-end text-xl font-extralight tracking-tight text-muted-foreground sm:text-2xl">
            {billingPerUnit}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
