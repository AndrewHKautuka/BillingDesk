"use client"

import { useState } from "react"

import { toast } from "sonner"
import type { ApiError, ProblemDetails } from "~/shared/types/api-error-types"
import {
  getApiErrorMessage,
  isProblemDetails,
} from "~/shared/utils/problem-details-utils"
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
import { useMockSubscriptions } from "~/subscription/hooks/use-mock-subscriptions"
import {
  useCreateSubscription,
  useDeleteSubscription,
  useUpdateSubscription,
} from "~/subscription/hooks/use-subscription-mutations"
import {
  useMonthlyTotal,
  useSubscriptions,
} from "~/subscription/hooks/use-subscription-queries"
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

  const { data, isLoading } = useSubscriptions()

  const subscriptions = data ?? []
  const inactiveSubscriptions = subscriptions.filter(
    (sub) => sub.status === "inactive"
  )

  const { mutateAsync: addSubscription } = useCreateSubscription()
  const { mutateAsync: updateSubscription } = useUpdateSubscription()
  const { mutateAsync: deleteSubscription } = useDeleteSubscription()

  const { toggleSubscriptionStatus } = useMockSubscriptions()

  const { data: totalResponse, isLoading: isLoadingTotal } = useMonthlyTotal()

  const total = totalResponse?.total ?? 0

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

  const handleFormSubmission = async (data: SubscriptionFormData) => {
    try {
      if (selectedSubscription) {
        // Edit mode: update existing subscription
        await updateSubscription({
          id: selectedSubscription.id,
          data: data as UpdateSubscriptionFormData,
        })
        toast.success(`Updated ${data.name}`)
      } else {
        // Add mode: create new subscription with generated UUID
        await addSubscription(data as CreateSubscriptionFormData)
        toast.success(`Created new subscription ${data.name}`)
      }

      setFormOpen(false)
      setSelectedSubscription(undefined)
    } catch (error) {
      const apiError = error as ApiError

      toast.error(getApiErrorMessage(apiError))

      if (isProblemDetails(apiError) && apiError.status === 400) {
        return apiError as ProblemDetails
      }
      // Keep dialog open on error so the user doesn't lose their input
    }
  }

  const handleDeleteConfirmed = async () => {
    try {
      if (selectedSubscription) {
        await deleteSubscription(selectedSubscription.id)
        toast.success("Subscription deleted")
      }
      setDeleteOpen(false)
      setSelectedSubscription(undefined)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(getApiErrorMessage(apiError), {
        description: `Failed to delete "${selectedSubscription?.name || "subscription"}". Please try again.`,
      })
      // Keep dialog open on error so the user doesn't lose their input
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Dashboard</h1>

      {isLoadingTotal ? (
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

        {isLoading || subscriptions.length !== 0 ? (
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
