"use client"

import { toast } from "sonner"
import { CheckoutPaymentCard } from "~/payment/components/checkout-payment-card"
import { CheckoutPaymentCardSkeleton } from "~/payment/components/checkout-payment-card-skeleton"
import { DueTodaySubscriptionsList } from "~/payment/components/due-today-subscriptions-list"
import { DueTodaySubscriptionsListSkeleton } from "~/payment/components/due-today-subscriptions-list-skeleton"
import { CheckoutPaymentCardError } from "~/payment/components/errors/checkout-payment-card-error"
import { DueTodaySubscriptionsListError } from "~/payment/components/errors/due-today-subscriptions-list-error"
import { SimulatePaymentCard } from "~/payment/components/simulate-payment-card"
import { SimulatePaymentCardPlaceholder } from "~/payment/components/simulate-payment-card-placeholder"
import { SimulatePaymentCardSkeleton } from "~/payment/components/simulate-payment-card-skeleton"
import { useProcessDueToday } from "~/payment/hooks/use-checkout-mutations"
import { useSimulateAcceptRequestToPay } from "~/payment/hooks/use-payment-mutations"
import { usePaymentRequestStore } from "~/payment/hooks/use-payment-request-store"
import { mapProcessSubscriptionsResponseToProcessSubscriptions } from "~/payment/utils/mappers"
import { getApiErrorMessage } from "~/shared/utils/problem-details-utils"
import {
  BUTTON_CLASS_NAME,
  INPUT_CLASS_NAME,
} from "~/subscription/constants/subscription-constants"
import { useUpcomingRenewals } from "~/subscription/hooks/use-subscription-queries"

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

  const {
    paymentRequest,
    isResolved,
    setPaymentRequest,
    setResolved,
    resetPaymentRequest,
  } = usePaymentRequestStore()

  const {
    mutate: requestPayment,
    isPending: isRequestingPayment,
    isError: isPaymentError,
    reset: resetPayment,
  } = useProcessDueToday()

  const {
    mutate: simulatePayment,
    isPending: isSimulating,
    reset: resetSimulation,
  } = useSimulateAcceptRequestToPay()

  const handlePay = () => {
    resetPayment()
    resetSimulation()
    requestPayment(undefined, {
      onSuccess: (response) => {
        const mapped =
          mapProcessSubscriptionsResponseToProcessSubscriptions(response)
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

  const handleSimulate = (connectorId: number) => {
    if (!paymentRequest) return
    resetSimulation()
    simulatePayment(
      {
        timedAccountNumber: paymentRequest.timedAccountNumber,
        transactionAmount: paymentRequest.transactionAmount,
        connectorId,
      },
      {
        onSuccess: () => {
          setResolved(true)
          toast.success("Payment simulation accepted successfully.")
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error), {
            description: "Failed to simulate the payment. Please try again.",
          })
        },
      }
    )
  }

  const handleReset = () => {
    resetPaymentRequest()
    resetSimulation()
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Payment</h1>

      {isLoadingRenewals ? (
        <CheckoutPaymentCardSkeleton />
      ) : isRenewalsError ? (
        <CheckoutPaymentCardError error={renewalsError!} />
      ) : (
        <CheckoutPaymentCard
          paymentRequest={paymentRequest}
          isPending={isRequestingPayment}
          isError={isPaymentError}
          isSuccess={isResolved}
          onPay={handlePay}
          buttonClassName={BUTTON_CLASS_NAME}
        />
      )}

      {isLoadingRenewals ? (
        <SimulatePaymentCardSkeleton />
      ) : isRenewalsError || isPaymentError ? null : paymentRequest === null ? (
        <SimulatePaymentCardPlaceholder />
      ) : (
        <SimulatePaymentCard
          paymentRequest={paymentRequest}
          isPending={isSimulating}
          isResolved={isResolved}
          onSimulate={handleSimulate}
          onReset={handleReset}
          inputClassName={INPUT_CLASS_NAME}
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
