"use client"

import { PlusCircleIcon } from "lucide-react"
import { SubscriptionForm } from "~/subscription/components/subscription-form"
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
  onSubmit: (data: CreateSubscriptionFormData) => void
}

export function SubscriptionFormDialog({
  onSubmit,
}: SubscriptionFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default">
            <PlusCircleIcon />
            <span>Add Subscription</span>
          </Button>
        }
      />

      <DialogContent showCloseButton={false} className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Subscription</DialogTitle>
          <DialogDescription>
            Fill in the details for your new subscription.
          </DialogDescription>
        </DialogHeader>

        <SubscriptionForm formId="subscription-form" onSubmit={onSubmit} />

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="subscription-form">
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
