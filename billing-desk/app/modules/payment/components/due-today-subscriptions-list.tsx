import { formatCurrency } from "~/shared/utils/format-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DueTodaySubscriptionsListProps {
  subscriptions: Subscription[]
}

export function DueTodaySubscriptionsList({
  subscriptions,
}: DueTodaySubscriptionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions Due Today</CardTitle>
        <CardDescription>
          {subscriptions.length === 0
            ? "No subscriptions are due for billing today."
            : `${subscriptions.length} subscription${subscriptions.length === 1 ? "" : "s"} scheduled for billing today.`}
        </CardDescription>
      </CardHeader>

      {subscriptions.length > 0 && (
        <CardContent className="divide-y divide-border p-0 pb-(--card-spacing) *:px-(--card-spacing)">
          {subscriptions.map((subscription) => {
            const [symbol, amount] = formatCurrency(
              subscription.cost,
              subscription.currency.toUpperCase()
            ) ?? ["", subscription.cost.toFixed(2)]

            const cycleLabel =
              subscription.billingCycle === "monthly" ? "Monthly" : "Yearly"

            return (
              <div
                key={subscription.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{subscription.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {subscription.category} - {cycleLabel}
                  </span>
                </div>

                <span className="font-mono font-semibold">
                  {symbol}
                  {amount}
                </span>
              </div>
            )
          })}
        </CardContent>
      )}
    </Card>
  )
}
