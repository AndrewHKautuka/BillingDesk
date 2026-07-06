"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "name",
    header: "Subscription",
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => {
      const formatted = formatCurrency(row.original.cost, row.original.currency)

      if (!formatted) {
        return <div className="text-right font-medium">-</div>
      }

      const [currency, amount] = formatted

      return (
        <div className="text-right font-medium">
          {currency} {amount}
        </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
