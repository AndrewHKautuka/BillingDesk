import { SubscriptionCard } from "~/subscription/components/subscription-card"
import type { Subscription } from "~/subscription/types/subscription-model"

interface DashboardPageProps {
  subscriptions: Subscription[]
}

export function DashboardPage({ subscriptions }: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} model={subscription} />
        ))}
      </div>
    </div>
  )
}
