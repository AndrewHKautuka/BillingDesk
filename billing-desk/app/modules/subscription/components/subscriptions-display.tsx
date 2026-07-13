import { SubscriptionCard } from "~/subscription/components/subscription-card"
import { SubscriptionTable } from "~/subscription/components/subscription-table"
import { SubscriptionsDisplayEmpty } from "~/subscription/components/subscriptions-display-empty"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { DisplayStyle } from "~/subscription/types/subscription-types"

interface SubscriptionsDisplayProps {
  subscriptions: Subscription[]
  displayStyle: DisplayStyle
  handleAddSubscription: () => void
  handleEditSubscription: (subscription: Subscription) => void
  handleDeleteSubscription: (subscription: Subscription) => void
  handleSubscriptionToggleStatus: (subscription: Subscription) => void
  buttonClassName?: string
}

export function SubscriptionsDisplay({
  subscriptions,
  displayStyle,
  handleAddSubscription,
  handleEditSubscription,
  handleDeleteSubscription,
  handleSubscriptionToggleStatus,
  buttonClassName,
}: SubscriptionsDisplayProps) {
  return subscriptions.length === 0 ? (
    <SubscriptionsDisplayEmpty handleAddSubscription={handleAddSubscription} />
  ) : displayStyle[0] === "list" ? (
    <SubscriptionTable
      subscriptions={subscriptions}
      onEdit={handleEditSubscription}
      onDelete={handleDeleteSubscription}
      onToggleStatus={handleSubscriptionToggleStatus}
    />
  ) : (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onEdit={handleEditSubscription}
          onDelete={handleDeleteSubscription}
          onToggleStatus={handleSubscriptionToggleStatus}
          buttonClassName={buttonClassName}
        />
      ))}
    </div>
  )
}
