"use client"

import { useState } from "react"

import { toast } from "sonner"
import { AddSubscriptionDialogTrigger } from "~/subscription/components/add-subscription-dialog-trigger"
import { DeleteConfirmationDialog } from "~/subscription/components/delete-confirmation-dialog"
import { MonthlySpendingCard } from "~/subscription/components/monthly-spending-card"
import { MonthlySpendingCardSkeleton } from "~/subscription/components/skeletons/monthly-spending-card"
import { SubscriptionsDisplaySkeleton } from "~/subscription/components/skeletons/subscriptions-display"
import { SubscriptionFormDialog } from "~/subscription/components/subscription-form-dialog"
import { SubscriptionsDisplay } from "~/subscription/components/subscriptions-display"
import { UnusedSubscriptionsBanner } from "~/subscription/components/unused-subscriptions-banner"
import {
  BUTTON_CLASS_NAME,
  INPUT_CLASS_NAME,
  UNUSED_WARNING_THRESHOLD,
} from "~/subscription/constants/subscription-constants"
import { useDisplayPreferences } from "~/subscription/hooks/use-display-preferences"
import {
  useMockMonthlyTotal,
  useMockSubscriptions,
} from "~/subscription/hooks/use-mock-subscriptions"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { DisplayStyle } from "~/subscription/types/subscription-types"
import {
  calculateMonthlyCost,
  formatTotalMonthlySpending,
} from "~/subscription/utils/subscription-utils"
import type {
  CreateSubscriptionFormData,
  SubscriptionFormData,
  UpdateSubscriptionFormData,
} from "~/subscription/validations/subscription-validations"

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
    isLoading,
  } = useMockSubscriptions()
  const { total } = useMockMonthlyTotal()

  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<
    Subscription | undefined
  >(undefined)

  const potentialSavingsStr = calculateMonthlyCost(inactiveSubscriptions)
  const totalMonthlyDisplay = formatTotalMonthlySpending(total)

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

      {isLoading ? (
        <MonthlySpendingCardSkeleton />
      ) : (
        <MonthlySpendingCard totalMonthlySpending={totalMonthlyDisplay} />
      )}

      {!isLoading &&
        inactiveSubscriptions.length > UNUSED_WARNING_THRESHOLD && (
          <UnusedSubscriptionsBanner
            count={inactiveSubscriptions.length}
            potentialSavings={potentialSavingsStr}
          />
        )}

      <div className="flex flex-row-reverse justify-between">
        <ToggleGroup
          variant="outline"
          spacing={0}
          value={displayStyle}
          onValueChange={handleDisplayStyleChange}
          disabled={isLoading}
        >
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="card-grid">Card Grid</ToggleGroupItem>
        </ToggleGroup>

        {subscriptions.length !== 0 ? (
          <AddSubscriptionDialogTrigger
            handleAddSubscription={handleAddSubscription}
            disabled={isLoading}
          />
        ) : null}
      </div>

      {isLoading ? (
        <SubscriptionsDisplaySkeleton />
      ) : (
        <SubscriptionsDisplay
          subscriptions={subscriptions}
          displayStyle={displayStyle}
          handleAddSubscription={handleAddSubscription}
          handleEditSubscription={handleEditSubscription}
          handleDeleteSubscription={handleDeleteSubscription}
          handleSubscriptionToggleStatus={handleSubscriptionToggleStatus}
          buttonClassName={BUTTON_CLASS_NAME}
        />
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
