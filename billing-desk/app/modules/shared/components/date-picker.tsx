"use client"

import { type ReactNode, useState } from "react"

import { isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { formatDateForInput } from "~/shared/utils/date-formatters"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  fieldId: string
  invalid: boolean
  label?: string
  date: Date | undefined
  minDate?: Date
  maxDate?: Date
  onChange: (date: Date | undefined) => void
  icon?: ReactNode
  placeholder?: string
  errors?: Array<{ message?: string } | undefined>
  required?: boolean
  buttonClassName?: string
}

export function DatePicker({
  fieldId,
  label,
  invalid,
  date,
  minDate,
  maxDate,
  onChange,
  icon = <CalendarIcon />,
  placeholder = "Select date",
  errors,
  required = false,
  buttonClassName,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Field data-invalid={invalid}>
      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={fieldId}
              variant="outline"
              data-empty={!date}
              className={buttonClassName}
            >
              {date && isValid(date) ? (
                formatDateForInput(date)
              ) : (
                <span>{placeholder}</span>
              )}
              {icon}
            </Button>
          }
        />

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            disabled={(date) => {
              if (minDate && date < minDate) {
                return true
              }

              if (maxDate && date > maxDate) {
                return true
              }

              return false
            }}
            onSelect={(date: Date | undefined) => {
              onChange(date)
              setOpen(false)
            }}
            required={required}
          />
        </PopoverContent>
      </Popover>

      {invalid && <FieldError errors={errors} />}
    </Field>
  )
}
