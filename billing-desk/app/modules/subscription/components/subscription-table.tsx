"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { createColumns } from "~/subscription/components/subscription-table-columns"
import {
  HIDDEN_ON_LARGE,
  HIDDEN_ON_SMALL,
} from "~/subscription/constants/subscription-table-constants"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type { Subscription } from "../types/subscription-model"

interface SubscriptionTableProps {
  subscriptions: Subscription[]
  onEdit: (subscription: Subscription) => void
  onDelete: (subscription: Subscription) => void
  onToggleStatus: (subscription: Subscription) => void
}

export function SubscriptionTable({
  subscriptions,
  onEdit,
  onDelete,
  onToggleStatus,
}: SubscriptionTableProps) {
  const columns = createColumns(onEdit, onDelete, onToggleStatus)

  const table = useReactTable({
    data: subscriptions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
    columnResizeMode: "onChange",
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isHiddenOnSmall = HIDDEN_ON_SMALL.has(header.column.id)
                const isHiddenOnLarge = HIDDEN_ON_LARGE.has(header.column.id)

                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      isHiddenOnSmall ? "hidden md:table-cell" : undefined,
                      isHiddenOnLarge ? "table-cell md:hidden" : undefined
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const isHiddenOnSmall = HIDDEN_ON_SMALL.has(cell.column.id)
                  const isHiddenOnLarge = HIDDEN_ON_LARGE.has(cell.column.id)

                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={cn(
                        isHiddenOnSmall ? "hidden md:table-cell" : undefined,
                        isHiddenOnLarge ? "table-cell md:hidden" : undefined
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
