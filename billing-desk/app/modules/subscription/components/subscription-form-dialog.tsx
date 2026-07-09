"use client"

import { PlusCircleIcon, SquarePenIcon } from "lucide-react"
import { SubscriptionForm } from "~/subscription/components/subscription-form"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { CreateSubscriptionFormData } from "~/subscription/validations/subscription-validations"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SubscriptionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subscription?: Subscription
  onSubmit: (data: CreateSubscriptionFormData) => void
  triggerClassName?: string
  inputClassName?: string
  buttonClassName?: string
}

export function SubscriptionFormDialog({
  open,
  onOpenChange,
  subscription,
  onSubmit,
  triggerClassName,
  inputClassName,
  buttonClassName,
}: SubscriptionFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button variant="default" className={triggerClassName}>
            {!subscription ? (
              <>
                <PlusCircleIcon />
                <span>Add Subscription</span>
              </>
            ) : (
              <>
                <SquarePenIcon />
                <span>Edit</span>
              </>
            )}
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {!subscription ? "Add New Subscription" : "Edit Subscription"}
          </DialogTitle>

          <DialogDescription>
            {!subscription
              ? "Fill in the details for your new subscription."
              : "Update the subscription details below."}
          </DialogDescription>
        </DialogHeader>

        <SubscriptionForm
          formId="subscription-form"
          subscription={subscription}
          onSubmit={onSubmit}
          inputClassName={inputClassName}
        />

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" className={buttonClassName}>
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            form="subscription-form"
            className={buttonClassName}
          >
            {!subscription ? "Add Subscription" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
