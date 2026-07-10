"use clients"

import { useState } from "react"

import { PlusCircleIcon } from "lucide-react"
import { toast } from "sonner"
import { DeleteConfirmationDialog } from "~/subscription/components/delete-confirmation-dialog"
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
import type { SubscriptionFormData } from "~/subscription/validations/subscription-validations"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface DashboardPageProps {
  subscriptions: Subscription[]
}

export function DashboardPage({ subscriptions }: DashboardPageProps) {
  const { displayStyle, setDisplayStyle } = useDisplayPreferences()

  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<
    Subscription | undefined
  >(undefined)

  const handleDisplayStyleChange = (newValue: string[]) => {
    if (newValue.length > 0) {
      setDisplayStyle(newValue as unknown as DisplayStyle)
    }
  }

  const handleAddSubscription = () => {
    setSelectedSubscription(undefined)
    setFormOpen(true)
  }

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setFormOpen(true)
  }

  const handleDeleteSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setDeleteOpen(true)
  }

  const handleSubscriptionToggleStatus = (subscription: Subscription) => {
    toast.info(
      `Toggling status for "${subscription.name}" (not yet implemented)`
    )
  }

  const handleFormSubmission = (data: SubscriptionFormData) => {
    toast.success(`Submitted ${data.name}`)
    setFormOpen(false)
    setSelectedSubscription(undefined)
  }

  const handleDeleteConfirmed = () => {
    toast.success("Subscription deleted")
    setDeleteOpen(false)
    setSelectedSubscription(undefined)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>

      <UnusedSubscriptionsBanner count={4} potentialSavings="$ 0" />

      <div className="flex flex-row justify-between">
        <Button
          variant="default"
          className={DIALOG_TRIGGER_CLASS_NAME}
          onClick={handleAddSubscription}
        >
          <PlusCircleIcon />
          <span>Add Subscription</span>
        </Button>

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
              onEdit={handleEditSubscription}
              onDelete={handleDeleteSubscription}
              onToggleStatus={handleSubscriptionToggleStatus}
              buttonClassName={BUTTON_CLASS_NAME}
            />
          ))}
        </div>
      )}

      <SubscriptionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        subscription={selectedSubscription}
        onSubmit={handleFormSubmission}
        inputClassName={INPUT_CLASS_NAME}
        buttonClassName={BUTTON_CLASS_NAME}
      />

      {selectedSubscription && (
        <DeleteConfirmationDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          subscription={selectedSubscription}
          onConfirm={handleDeleteConfirmed}
          buttonClassName={BUTTON_CLASS_NAME}
        />
      )}
    </div>
  )
}
