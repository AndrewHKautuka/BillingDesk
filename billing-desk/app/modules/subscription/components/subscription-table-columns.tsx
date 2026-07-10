"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { capitalCase } from "change-case"
import type { FormattedCurrency } from "~/shared/types/format-utils-types"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type { Subscription } from "~/subscription/types/subscription-model"

import { Badge } from "@/components/ui/badge"

export const createColumns: (
  onEdit: (subscription: Subscription) => void,
  onDelete: (subscription: Subscription) => void,
  onToggleStatus: (subscription: Subscription) => void
) => ColumnDef<Subscription>[] = () => [
  {
    id: "subscription",
    accessorFn: (row) => [row.name, row.category],
    header: "Subscription",
    cell: ({ row }) => {
      const [name, category] = row.getValue("subscription") as [string, string]

      return (
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
      )
    },
  },
  {
    id: "formattedCost",
    accessorFn: (row) =>
      formatCurrency(row.cost, row.currency.toUpperCase()) ?? null,
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => {
      const formatted = row.getValue(
        "formattedCost"
      ) as FormattedCurrency | null

      if (!formatted) {
        return (
          <div className="text-right">
            <span className="text-muted-foreground italic">-</span>
          </div>
        )
      }

      const [currency, amount] = formatted

      return (
        <div className="text-right">
          <span>
            {currency} {amount}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "billingCycle",
    header: () => <div className="text-right">Billing Cycle</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <span>{capitalCase(row.getValue("billingCycle"))}</span>
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-right">Start Date</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <span>{formatDate(row.getValue("startDate"))}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as SubscriptionStatus
      const active = status === "active"
      const formattedStatus = capitalCase(status)

      return (
        <div className="text-center">
          <Badge
            variant={active ? "default" : "destructive"}
            className="font-semibold"
          >
            <span>{formattedStatus}</span>
          </Badge>
        </div>
      )
    },
  },
]
