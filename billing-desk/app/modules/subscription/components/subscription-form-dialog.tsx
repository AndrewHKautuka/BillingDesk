"use client"

import { FormServerError } from "~/shared/components/form-server-error"
import type { ProblemDetails } from "~/shared/types/api-error-types"
import { SubscriptionForm } from "~/subscription/components/subscription-form"
import type { Subscription } from "~/subscription/types/subscription-model"
import type { SubscriptionFormData } from "~/subscription/validations/subscription-validations"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SubscriptionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subscription?: Subscription
  onSubmit: (data: SubscriptionFormData) => Promise<void | ProblemDetails>
  formError?: string
  inputClassName?: string
  buttonClassName?: string
}

export function SubscriptionFormDialog({
  open,
  onOpenChange,
  subscription,
  onSubmit,
  formError,
  inputClassName,
  buttonClassName,
}: SubscriptionFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[500px] [&:has(form[data-invalid=true])]:border-destructive [&:has(form[data-invalid=true])]:ring-2 [&:has(form[data-invalid=true])]:ring-destructive"
      >
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
          formError={formError}
        />

        <DialogFooter className="flex-col sm:flex-col">
          {formError && <FormServerError message={formError} />}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
