"use client"

import { useState } from "react"

import { toast } from "sonner"
import { CheckoutPaymentCard } from "~/payment/components/checkout-payment-card"
import { CheckoutPaymentCardSkeleton } from "~/payment/components/checkout-payment-card-skeleton"
import { DueTodaySubscriptionsList } from "~/payment/components/due-today-subscriptions-list"
import { DueTodaySubscriptionsListSkeleton } from "~/payment/components/due-today-subscriptions-list-skeleton"
import { DueTodaySubscriptionsListError } from "~/payment/components/errors/due-today-subscriptions-list-error"
import { useProcessDueToday } from "~/payment/hooks/use-checkout-mutations"
import type { RequestForPayement } from "~/payment/types/checkout-models"
import { mapRequestForPayementResponseToRequestForPayement } from "~/payment/utils/mappers"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import { BUTTON_CLASS_NAME } from "~/subscription/constants/subscription-constants"
import { useUpcomingRenewals } from "~/subscription/hooks/use-subscription-queries"
import { calculateMonthlyCost } from "~/subscription/utils/subscription-utils"

// lookahead of 0 days returns only subscriptions due today
const DUE_TODAY_LOOKAHEAD = 0

export function PaymentPage() {
  const {
    data: renewals,
    isLoading: isLoadingRenewals,
    isError: isRenewalsError,
    error: renewalsError,
    refetch: refetchRenewals,
  } = useUpcomingRenewals(DUE_TODAY_LOOKAHEAD)

  const subscriptionsDueToday =
    renewals?.map((renewal) => renewal.subscription) ?? []

  // Derive total from today's subscriptions
  const totalAmount = calculateMonthlyCost(subscriptionsDueToday)

  const [paymentRequest, setPaymentRequest] =
    useState<RequestForPayement | null>(null)

  const {
    mutate: requestPayment,
    isPending,
    isError,
    reset,
  } = useProcessDueToday()

  const handlePay = () => {
    reset()
    requestPayment(undefined, {
      onSuccess: (response) => {
        const mapped =
          mapRequestForPayementResponseToRequestForPayement(response)
        setPaymentRequest(mapped)
        toast.success(
          "Payment session created. Send payment before it expires."
        )
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error), {
          description: "Failed to create a payment session. Please try again.",
        })
      },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Payment</h1>

      {isLoadingRenewals ? (
        <CheckoutPaymentCardSkeleton />
      ) : (
        <CheckoutPaymentCard
          paymentRequest={paymentRequest}
          transactionAmount={totalAmount}
          isPending={isPending}
          isError={isError || isRenewalsError}
          onPay={handlePay}
          buttonClassName={BUTTON_CLASS_NAME}
        />
      )}

      {isLoadingRenewals ? (
        <DueTodaySubscriptionsListSkeleton />
      ) : isRenewalsError ? (
        <DueTodaySubscriptionsListError
          error={renewalsError!}
          refetchRenewals={refetchRenewals}
          buttonClassName={BUTTON_CLASS_NAME}
        />
      ) : (
        <DueTodaySubscriptionsList subscriptions={subscriptionsDueToday} />
      )}
    </div>
  )
}
