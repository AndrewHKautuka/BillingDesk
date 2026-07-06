"use clients"

import { useState } from "react"

import { SubscriptionCard } from "~/subscription/components/subscription-card"
import type { Subscription } from "~/subscription/types/subscription-model"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface DashboardPageProps {
  subscriptions: Subscription[]
}

type DisplayStyle = ["list"] | ["card-grid"]

export function DashboardPage({ subscriptions }: DashboardPageProps) {
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>(["card-grid"])

  const handleDisplayStyleChange = (newValue: string[]) => {
    if (newValue.length > 0) {
      setDisplayStyle(newValue as DisplayStyle)
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
        <></>
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
