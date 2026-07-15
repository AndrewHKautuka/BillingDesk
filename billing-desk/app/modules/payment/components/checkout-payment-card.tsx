"use client"

import { useEffect, useState } from "react"

import { differenceInSeconds, isPast } from "date-fns"
import { ClockIcon, CreditCardIcon, Loader2Icon } from "lucide-react"
import type { RequestForPayement } from "~/payment/types/checkout-models"
import { formatCountdown } from "~/shared/utils/time-formatters"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CheckoutPaymentCardProps {
  paymentRequest: RequestForPayement | null
  transactionAmount: string
  isPending: boolean
  isError: boolean
  onPay: () => void
  buttonClassName?: string
}

export function CheckoutPaymentCard({
  paymentRequest,
  transactionAmount,
  isPending,
  isError,
  onPay,
  buttonClassName,
}: CheckoutPaymentCardProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null)

  // Keep the countdown ticking every second while a payment request is active.
  useEffect(() => {
    if (!paymentRequest) {
      return
    }

    const update = () => {
      const diff = differenceInSeconds(paymentRequest.expiryDate, new Date())
      setSecondsRemaining(Math.max(0, diff))
    }

    update()
    const id = setInterval(update, 1_000)
    return () => clearInterval(id)
  }, [paymentRequest])

  // Reset countdown when the payment request is cleared
  const seconds = paymentRequest !== null ? secondsRemaining : null

  const isExpired =
    paymentRequest !== null &&
    (seconds === 0 || isPast(paymentRequest.expiryDate))

  // The button is enabled when: no active request, request expired, or last attempt failed.
  const canPay = !isPending && (paymentRequest === null || isExpired || isError)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="size-5" />
          Payment via OneKhusa
        </CardTitle>

        <CardDescription>
          {paymentRequest
            ? "Send payment to the Timed Account Number below before it expires."
            : "Request a payment session to receive your Timed Account Number."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-4">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Timed Account Number
            </span>

            <span className="font-mono text-xl font-semibold tracking-widest">
              {paymentRequest ? paymentRequest.timedAccountNumber : "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-4">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Total to Transact
            </span>

            <div className="flex items-baseline gap-0.5">
              {/* <span className="text-sm font-light text-muted-foreground">
                {amountSymbol}
              </span> */}

              <span className="text-xl font-semibold">{transactionAmount}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-4">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Time Remaining
            </span>

            {paymentRequest && seconds !== null ? (
              <div
                className={cn(
                  "flex items-center gap-1.5",
                  isExpired && "text-destructive",
                  seconds < 60 && "flex items-center gap-1.5 text-orange-500"
                )}
              >
                <ClockIcon className="size-4 shrink-0" />

                <span className="font-mono text-xl font-semibold">
                  {isExpired ? "Expired" : formatCountdown(seconds)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-semibold text-muted-foreground">
                -:--
              </span>
            )}
          </div>
        </div>

        <Button
          className={cn("w-fit", buttonClassName)}
          onClick={onPay}
          disabled={!canPay}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          {isPending
            ? "Requesting…"
            : paymentRequest && !isExpired && !isError
              ? "Payment Requested"
              : "Request Payment"}
        </Button>
      </CardContent>
    </Card>
  )
}
