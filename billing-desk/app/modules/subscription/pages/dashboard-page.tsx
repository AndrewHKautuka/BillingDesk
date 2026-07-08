"use clients"

import { SubscriptionCard } from "~/subscription/components/subscription-card"
import { SubscriptionTable } from "~/subscription/components/subscription-table"
import { columns } from "~/subscription/components/subscription-table-columns"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { DisplayStyle } from "~/subscription/types/subscription-types"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface DashboardPageProps {
  subscriptions: Subscription[]
}

export function DashboardPage({ subscriptions }: DashboardPageProps) {
  const { displayStyle, setDisplayStyle } = useDisplayPreferences()

  const handleDisplayStyleChange = (newValue: string[]) => {
    if (newValue.length > 0) {
      setDisplayStyle(newValue as unknown as DisplayStyle)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>

      <ToggleGroup
        variant="outline"
        spacing={0}
        value={displayStyle}
        onValueChange={handleDisplayStyleChange}
        className="self-end"
      >
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="card-grid">Card Grid</ToggleGroupItem>
      </ToggleGroup>

      {displayStyle[0] === "list" ? (
        <SubscriptionTable columns={columns} subscriptions={subscriptions} />
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {subscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id} model={subscription} />
          ))}
        </div>
      )}
    </div>
  )
}
