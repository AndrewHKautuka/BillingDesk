"use client"

import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { capitalCase } from "change-case"
import { Controller, useForm } from "react-hook-form"
import { DatePicker } from "~/shared/components/date-picker"
import {
  BILLING_CYCLE_OPTIONS,
  CURRENCY_OPTIONS,
} from "~/subscription/types/subscription-enums"
import type { Subscription } from "~/subscription/types/subscription-model"
import {
  createSubscriptionSchema,
  type SubscriptionFormData,
  updateSubscriptionSchema,
} from "~/subscription/validations/subscription-validations"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SubscriptionFormProps {
  formId?: string
  subscription?: Subscription
  onSubmit: (data: SubscriptionFormData) => void
  inputClassName?: string
}

export function SubscriptionForm({
  formId,
  subscription,
  onSubmit,
  inputClassName,
}: SubscriptionFormProps) {
  const schema = !subscription
    ? createSubscriptionSchema
    : updateSubscriptionSchema

  const { control, handleSubmit, reset } = useForm<SubscriptionFormData>({
    resolver: zodResolver(schema),
    defaultValues: subscription
      ? {
          name: subscription.name,
          cost: subscription.cost,
          currency: subscription.currency,
          billingCycle: subscription.billingCycle,
          startDate: subscription.startDate,
          category: subscription.category,
        }
      : {
          name: "",
          cost: undefined,
          currency: undefined,
          billingCycle: undefined,
          startDate: undefined,
          category: "",
        },
  })

  // Reset form when subscription changes
  useEffect(() => {
    if (subscription) {
      reset({
        name: subscription.name,
        cost: subscription.cost,
        currency: subscription.currency,
        billingCycle: subscription.billingCycle,
        startDate: subscription.startDate,
        category: subscription.category,
      })
    } else {
      reset({
        name: "",
        cost: undefined,
        currency: undefined,
        billingCycle: undefined,
        startDate: undefined,
        category: "",
      })
    }
  }, [subscription, reset])

  const handleFormSubmit = (data: SubscriptionFormData) => {
    onSubmit(data)
  }

  return (
    <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldGroup>
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subscription-form-name">Name</FieldLabel>

              <Input
                {...field}
                id="subscription-form-name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter subscription name"
                className={inputClassName}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Cost Field */}
        <Controller
          name="cost"
          control={control}
          render={({ field: { onChange, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subscription-form-cost">Cost</FieldLabel>

              <Input
                {...field}
                id="subscription-form-cost"
                aria-invalid={fieldState.invalid}
                type="number"
                step="0.01"
                placeholder="0.00"
                onChange={(e) => onChange(e.target.valueAsNumber)}
                className={inputClassName}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Currency Field */}
        <Controller
          name="currency"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subscription-form-currency">
                Currency
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="subscription-form-currency"
                  aria-invalid={fieldState.invalid}
                  className={cn("w-full", inputClassName)}
                >
                  <SelectValue placeholder="Select currency">
                    {field.value ? field.value.toUpperCase() : null}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {CURRENCY_OPTIONS.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Billing Cycle Field */}
        <Controller
          name="billingCycle"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subscription-form-billingCycle">
                Billing Cycle
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="subscription-form-billingCycle"
                  aria-invalid={fieldState.invalid}
                  className={cn("w-full", inputClassName)}
                >
                  <SelectValue placeholder="Select billing cycle">
                    {field.value ? capitalCase(field.value) : null}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {BILLING_CYCLE_OPTIONS.map((billingCycle) => (
                    <SelectItem key={billingCycle} value={billingCycle}>
                      {capitalCase(billingCycle)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Start Date Field */}
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              fieldId="subscription-form-startDate"
              invalid={fieldState.invalid}
              label="Start Date"
              date={field.value}
              onChange={field.onChange}
              errors={[fieldState.error]}
              buttonClassName={inputClassName}
            />
          )}
        />

        {/* Category Field */}
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subscription-form-category">
                Category
              </FieldLabel>

              <Input
                {...field}
                id="subscription-form-category"
                aria-invalid={fieldState.invalid}
                placeholder="Enter category"
                className={inputClassName}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
