"use clients"

import { useState } from "react"

import { toast } from "sonner"
import { SubscriptionCard } from "~/subscription/components/subscription-card"
import { SubscriptionFormDialog } from "~/subscription/components/subscription-form-dialog"
import { SubscriptionTable } from "~/subscription/components/subscription-table"
import { columns } from "~/subscription/components/subscription-table-columns"
import { UnusedSubscriptionsBanner } from "~/subscription/components/unused-subscriptions-banner"
import {
  BUTTON_CLASS_NAME,
  DIALOG_TRIGGER_CLASS_NAME,
  INPUT_CLASS_NAME,
} from "~/subscription/constants/subscription-constants"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { DisplayStyle } from "~/subscription/types/subscription-types"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface DashboardPageProps {
  subscriptions: Subscription[]
}

export function DashboardPage({ subscriptions }: DashboardPageProps) {
  const { displayStyle, setDisplayStyle } = useDisplayPreferences()

  const [open, setOpen] = useState(false)

  const handleDisplayStyleChange = (newValue: string[]) => {
    if (newValue.length > 0) {
      setDisplayStyle(newValue as unknown as DisplayStyle)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>

      <UnusedSubscriptionsBanner count={4} potentialSavings="$ 0" />

      <div className="flex flex-row justify-between">
        <SubscriptionFormDialog
          open={open}
          onOpenChange={setOpen}
          onSubmit={() => {
            toast.success("Submitted")
            setOpen(false)
          }}
          triggerClassName={DIALOG_TRIGGER_CLASS_NAME}
          inputClassName={INPUT_CLASS_NAME}
          buttonClassName={BUTTON_CLASS_NAME}
        />

        <ToggleGroup
          variant="outline"
          spacing={0}
          value={displayStyle}
          onValueChange={handleDisplayStyleChange}
        >
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="card-grid">Card Grid</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {displayStyle[0] === "list" ? (
        <SubscriptionTable columns={columns} subscriptions={subscriptions} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              buttonClassName={BUTTON_CLASS_NAME}
            />
          ))}
        </div>
      )}
    </div>
  )
}
