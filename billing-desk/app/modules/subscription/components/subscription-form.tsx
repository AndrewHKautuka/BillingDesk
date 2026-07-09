"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { capitalCase } from "change-case"
import { Controller, useForm } from "react-hook-form"
import { DatePicker } from "~/shared/components/date-picker"
import {
  BILLING_CYCLE_OPTIONS,
  CURRENCY_OPTIONS,
} from "~/subscription/types/subscription-enums"
import {
  type CreateSubscriptionFormData,
  createSubscriptionSchema,
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

interface SubscriptionFormProps {
  formId?: string
  onSubmit: (data: CreateSubscriptionFormData) => void
}

export function SubscriptionForm({ formId, onSubmit }: SubscriptionFormProps) {
  const { control, handleSubmit } = useForm<CreateSubscriptionFormData>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      name: "",
      cost: 0,
      currency: "usd" as const,
      billingCycle: "monthly" as const,
      startDate: new Date(),
      category: "",
    },
  })

  const handleFormSubmit = (data: CreateSubscriptionFormData) => {
    onSubmit(data)
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
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
                  className="w-full"
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
                  className="w-full"
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
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
