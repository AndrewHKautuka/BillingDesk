"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FlaskConicalIcon, Loader2Icon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useSimulatePaymentStore } from "~/payment/hooks/use-simulate-payment-store"
import type { ProcessSubscriptions } from "~/payment/types/checkout-models"
import {
  type SimulatePaymentFormData,
  simulatePaymentSchema,
} from "~/payment/validations/payment-validations"

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
import env from "@/config/env"
import { cn } from "@/lib/utils"

const FORM_ID = "simulate-payment-form"

interface SimulatePaymentCardProps {
  paymentRequest: ProcessSubscriptions
  isPending: boolean
  onSimulate: (connectorId: number) => void
  inputClassName?: string
  buttonClassName?: string
}

export function SimulatePaymentCard({
  paymentRequest,
  isPending,
  onSimulate,
  inputClassName,
  buttonClassName,
}: SimulatePaymentCardProps) {
  const connectors = env.CONNECTORS

  const { connectorId: storedConnectorId, setConnectorId } =
    useSimulatePaymentStore()

  const { control, handleSubmit } = useForm<SimulatePaymentFormData>({
    resolver: zodResolver(simulatePaymentSchema),
    defaultValues: {
      connectorId:
        storedConnectorId ??
        (connectors.length === 1 ? connectors[0].id : undefined),
    },
  })

  const handleFormSubmit = (options: SimulatePaymentFormData) => {
    onSimulate(options.connectorId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConicalIcon className="size-5" />
          Simulate Payment
        </CardTitle>

        <CardDescription>
          Simulate the payment being accepted for TAN{" "}
          <span className="font-mono font-medium">
            {paymentRequest.timedAccountNumber}
          </span>
          .
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id={FORM_ID} onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-4">
            <Controller
              name="connectorId"
              control={control}
              disabled={isPending}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={`${FORM_ID}-${field.name}`}>
                      Payment Method
                    </FieldLabel>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>

                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      setConnectorId(value ?? undefined)
                    }}
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      id={`${FORM_ID}-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      className={cn("min-w-[120px]", inputClassName)}
                    >
                      <SelectValue placeholder="Select a connector…">
                        {connectors.find(({ id }) => id === field.value)?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {connectors.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
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
        <Button
          type="submit"
          form={FORM_ID}
          className={cn("w-fit", buttonClassName)}
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          {isPending ? "Simulating…" : "Simulate Accept"}
        </Button>
      </CardFooter>
    </Card>
  )
}
