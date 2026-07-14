"use client"

import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  DEFAULT_LOOKAHEAD_DAYS,
  LOOKAHEAD_OPTIONS,
} from "~/subscription/constants/subscription-constants"
import {
  type UpcomingRenewalsFilters,
  upcomingRenewalsFilters,
} from "~/subscription/validations/subscription-filter-validations"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface UpcomingRenewalsFiltersFormProps {
  applyFilters: (filters: UpcomingRenewalsFilters) => void
  initialFilters?: UpcomingRenewalsFilters
  disabled?: boolean
  inputClassName?: string
  buttonClassName?: string
}

const defaultFilters: UpcomingRenewalsFilters = {
  lookAheadDays: DEFAULT_LOOKAHEAD_DAYS,
}

export function UpcomingRenewalsFiltersForm({
  applyFilters,
  initialFilters,
  disabled,
  inputClassName,
  buttonClassName,
}: UpcomingRenewalsFiltersFormProps) {
  const formId = "upcoming-renewals-filter-form"

  const { control, handleSubmit, reset } = useForm<UpcomingRenewalsFilters>({
    resolver: zodResolver(upcomingRenewalsFilters),
    defaultValues: initialFilters ?? defaultFilters,
  })

  useEffect(() => {
    if (initialFilters) {
      reset(initialFilters)
    } else {
      reset()
    }
  }, [reset, initialFilters])

  const handleFormSubmit = (filters: UpcomingRenewalsFilters) => {
    applyFilters(filters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Renewals Filters</CardTitle>

        <CardDescription>
          Apply filters to the upcoming renewals display
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-4">
            <Controller
              name="lookAheadDays"
              control={control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="responsive"
                >
                  <FieldContent>
                    <FieldLabel htmlFor={`${formId}-${field.name}`}>
                      Lookahead
                    </FieldLabel>

                    <FieldDescription>
                      Lookahead period in days
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>

                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      id={`${formId}-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      className={cn("min-w-[120px]", inputClassName)}
                    >
                      <SelectValue placeholder="Select lookahead" />
                    </SelectTrigger>

                    <SelectContent>
                      {LOOKAHEAD_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          <span className="text-right">{option}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="flex-row-reverse">
          <Button
            type="submit"
            form={formId}
            className={buttonClassName}
            disabled={disabled}
          >
            Apply
          </Button>

          <Button
            variant="outline"
            className={buttonClassName}
            onClick={() => reset()}
            disabled={disabled}
          >
            Reset
          </Button>

          <Button
            variant="destructive"
            className={buttonClassName}
            onClick={() => reset(defaultFilters)}
            disabled={disabled}
          >
            Reset to Defaults
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
