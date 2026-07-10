"use client"

import { useState } from "react"

import { capitalCase } from "change-case"
import {
  Calendar1Icon,
  CircleCheckBigIcon,
  CircleMinusIcon,
} from "lucide-react"
import { toast } from "sonner"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
import { DeleteConfirmationDialog } from "~/subscription/components/delete-confirmation-dialog"
import { SubscriptionFormDialog } from "~/subscription/components/subscription-form-dialog"
import {
  BUTTON_CLASS_NAME,
  INPUT_CLASS_NAME,
} from "~/subscription/constants/subscription-constants"
import type { Subscription } from "~/subscription/types/subscription-model"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SubscriptionCardProps {
  subscription: Subscription
  buttonClassName?: string
}

export function SubscriptionCard({
  subscription,
  buttonClassName,
}: SubscriptionCardProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const active = subscription.status === "active"
  const [currency, cost] = formatCurrency(
    subscription.cost,
    subscription.currency.toUpperCase()
  ) ?? ["", "N/A"]
  const billingPerUnit = `/${subscription.billingCycle === "monthly" ? "Mon" : "Year"}`
  const formattedStatus = capitalCase(subscription.status)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {subscription.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">{`Started on:`}</span>
            <Badge variant="outline" className="font-semibold">
              <Calendar1Icon className="size-4" />
              <span>{formatDate(subscription.startDate)}</span>
            </Badge>
          </div>

          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">Status:</span>
            <Badge
              variant={active ? "default" : "destructive"}
              className="font-semibold"
            >
              <span>{formattedStatus}</span>
            </Badge>
          </div>

          {subscription.category && (
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-semibold">{subscription.category}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center gap-1">
          <span className="self-start text-2xl font-extralight tracking-tight text-muted-foreground">
            {currency}
          </span>
          <span className="self-center py-1.5 text-4xl font-semibold tracking-tighter">
            {cost}
          </span>
          <span className="self-end text-2xl font-extralight tracking-tight text-muted-foreground">
            {billingPerUnit}
          </span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2">
        <SubscriptionFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          subscription={subscription}
          onSubmit={() => {
            toast.success("Submitted")
            setFormOpen(false)
          }}
          triggerClassName={buttonClassName}
          inputClassName={INPUT_CLASS_NAME}
          buttonClassName={BUTTON_CLASS_NAME}
        />

        <DeleteConfirmationDialog
          open={confirmDeleteOpen}
          onOpenChange={setConfirmDeleteOpen}
          subscription={subscription}
          onConfirm={() => {
            toast.success("Deleted subscription")
            setConfirmDeleteOpen(false)
          }}
          triggerClassName={buttonClassName}
          buttonClassName={BUTTON_CLASS_NAME}
        />

        <Button variant="outline" className={cn("col-span-2", buttonClassName)}>
          {active ? (
            <>
              <CircleMinusIcon />
              <span>Mark as Unused</span>
            </>
          ) : (
            <>
              <CircleCheckBigIcon />
              <span>Reactivate</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
