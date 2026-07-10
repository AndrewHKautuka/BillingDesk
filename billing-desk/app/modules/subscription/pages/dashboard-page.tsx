"use client"

import { useState } from "react"

import { PlusCircleIcon } from "lucide-react"
import { toast } from "sonner"
import { DeleteConfirmationDialog } from "~/subscription/components/delete-confirmation-dialog"
import { SubscriptionCard } from "~/subscription/components/subscription-card"
import { SubscriptionFormDialog } from "~/subscription/components/subscription-form-dialog"
import { SubscriptionTable } from "~/subscription/components/subscription-table"
import { UnusedSubscriptionsBanner } from "~/subscription/components/unused-subscriptions-banner"
import {
  BUTTON_CLASS_NAME,
  DIALOG_TRIGGER_CLASS_NAME,
  INPUT_CLASS_NAME,
} from "~/subscription/constants/subscription-constants"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import { useMockSubscriptions } from "~/subscription/hooks/use-mock-subscriptions"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { DisplayStyle } from "~/subscription/types/subscription-types"
import type {
  CreateSubscriptionFormData,
  SubscriptionFormData,
  UpdateSubscriptionFormData,
} from "~/subscription/validations/subscription-validations"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function DashboardPage() {
  const { displayStyle, setDisplayStyle } = useDisplayPreferences()

  const {
    subscriptions,
    inactiveSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    toggleSubscriptionStatus,
  } = useMockSubscriptions()

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
    toggleSubscriptionStatus(subscription.id)
    toast.success(
      `${subscription.name} is now ${subscription.status === "active" ? "inactive" : "active"}`
    )
  }

  const handleFormSubmission = (data: SubscriptionFormData) => {
    if (selectedSubscription) {
      // Edit mode: update existing subscription
      updateSubscription(
        selectedSubscription.id,
        data as UpdateSubscriptionFormData
      )
    } else {
      // Add mode: create new subscription with generated UUID
      addSubscription(data as CreateSubscriptionFormData)
      toast.success(`Created new subscription ${data.name}`)
    }

    setFormOpen(false)
    setSelectedSubscription(undefined)
  }

  const handleDeleteConfirmed = () => {
    if (selectedSubscription) {
      deleteSubscription(selectedSubscription.id)
      toast.success("Subscription deleted")
    }
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
