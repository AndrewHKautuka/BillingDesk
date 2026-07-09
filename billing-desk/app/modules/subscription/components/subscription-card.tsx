"use client"

import { capitalCase } from "change-case"
import { Calendar1Icon } from "lucide-react"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
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

interface SubscriptionCardProps {
  model: Subscription
}

export function SubscriptionCard({ model }: SubscriptionCardProps) {
  const active = model.status === "active"
  const [currency, cost] = formatCurrency(
    model.cost,
    model.currency.toUpperCase()
  )!
  const billingPerUnit = `/${model.billingCycle === "monthly" ? "Mon" : "Year"}`
  const formattedStatus = capitalCase(model.status)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="text-muted-foreground">{`Started on:`}</span>
            <Badge variant="outline" className="font-semibold">
              <Calendar1Icon className="size-4" />
              <span>{formatDate(model.startDate)}</span>
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

          {!model.category || (
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-semibold">{model.category}</span>
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
        <Button variant="default" className="rounded-md">
          Edit
        </Button>
        <Button variant="destructive" className="rounded-md">
          Delete
        </Button>
        <Button variant="outline" className="col-span-2 rounded-md">
          {active ? "Mark as Unused" : "Reactivate"}
        </Button>
      </CardFooter>
    </Card>
  )
}
