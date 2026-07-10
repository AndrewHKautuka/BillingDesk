"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { capitalCase } from "change-case"
import type { FormattedCurrency } from "~/shared/types/format-utils-types"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "name",
    header: "Subscription",
  },
  {
    id: "formattedCost",
    accessorFn: (row) => {
      const formatted = formatCurrency(row.cost, row.currency)

      if (!formatted) {
        return null
      }

      return formatted
    },
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
      const status = row.getValue("status")
      const active = status === "active"
      const formattedStatus = capitalCase(row.getValue("status"))

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
