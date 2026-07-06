"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { FormattedCurrency } from "~/shared/types/format-utils-types"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { Subscription } from "~/subscription/types/subscription-model"

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
