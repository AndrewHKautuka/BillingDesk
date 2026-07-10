"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { capitalCase } from "change-case"
import {
  CircleCheckBigIcon,
  CircleMinusIcon,
  MenuIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react"
import type { FormattedCurrency } from "~/shared/types/format-utils-types"
import { formatDate } from "~/shared/utils/date-formatters"
import { formatCurrency } from "~/shared/utils/format-utils"
import type { SubscriptionStatus } from "~/subscription/types/subscription-enums"
import type { Subscription } from "~/subscription/types/subscription-model"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const createColumns: (
  onEdit: (subscription: Subscription) => void,
  onDelete: (subscription: Subscription) => void,
  onToggleStatus: (subscription: Subscription) => void
) => ColumnDef<Subscription>[] = (onEdit, onDelete, onToggleStatus) => [
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
    size: 90,
    minSize: 90,
    maxSize: 130,
  },
  {
    accessorKey: "billingCycle",
    header: () => <div className="text-right">Billing Cycle</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <span>{capitalCase(row.getValue("billingCycle"))}</span>
      </div>
    ),
    size: 90,
    minSize: 90,
    maxSize: 130,
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-right">Start Date</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <span>{formatDate(row.getValue("startDate"))}</span>
      </div>
    ),
    size: 90,
    minSize: 90,
    maxSize: 130,
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
    size: 60,
    minSize: 60,
    maxSize: 80,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const subscription = row.original
      const active = subscription.status === "active"

      return (
        <DropdownMenu>
          <div className="flex justify-center">
            <DropdownMenuTrigger
              render={
                <Button size="icon" variant="ghost">
                  <MenuIcon />
                </Button>
              }
            />
          </div>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Subscription Actions</DropdownMenuLabel>

              <DropdownMenuItem onClick={() => onEdit(subscription)}>
                <SquarePenIcon />
                <span>Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onToggleStatus(subscription)}>
                {active ? (
                  <>
                    <CircleMinusIcon className="size-4" />
                    <span className="hidden sm:inline">Mark as Unused</span>
                  </>
                ) : (
                  <>
                    <CircleCheckBigIcon className="size-4" />
                    <span className="hidden sm:inline">Reactivate</span>
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(subscription)}
              >
                <Trash2Icon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 40,
    minSize: 40,
    maxSize: 40,
  },
]
