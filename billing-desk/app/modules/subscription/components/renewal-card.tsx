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
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            isImminent && "text-red-600 dark:text-red-400"
          )}
        >
          {subscription.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">Next billing:</span>
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

          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">Days until renewal:</span>
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

          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">Billing cycle:</span>
            <span className="font-semibold capitalize">
              {subscription.billingCycle}
            </span>
          </div>

          {subscription.category && (
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-semibold">{subscription.category}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center gap-1">
          <span className="self-start text-2xl font-extralight tracking-tight text-muted-foreground">
            {currency}
          </span>
          <span
            className={cn(
              "self-center py-1.5 text-4xl font-semibold tracking-tighter",
              isImminent && "text-red-600 dark:text-red-400"
            )}
          >
            {cost}
          </span>
          <span className="self-end text-2xl font-extralight tracking-tight text-muted-foreground">
            {billingPerUnit}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
