import type { ColumnDef } from "@tanstack/react-table"
import type { Subscription } from "~/subscription/types/subscription-model"

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "name",
    header: "Subscription",
  },
  {
    accessorKey: "cost",
    header: "Cost",
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
