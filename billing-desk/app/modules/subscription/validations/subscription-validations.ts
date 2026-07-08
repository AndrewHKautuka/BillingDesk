import * as z from "zod"
import {
  BILLING_CYCLE_OPTIONS,
  CURRENCY_OPTIONS,
} from "~/subscription/types/subscription-enums"

// Create Subscription Schema - All fields required for POST
export const createSubscriptionSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cost: z.number().positive("Cost must be positive"),
  currency: z.enum(CURRENCY_OPTIONS, "Invalid currency"),
  billingCycle: z.enum(BILLING_CYCLE_OPTIONS, "Invalid billing cycle"),
  startDate: z.date("Start date is required"),
  category: z.string(),
})

// Update Subscription Schema - All fields required for PUT (full replacement)
export const updateSubscriptionSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cost: z.number().positive("Cost must be positive"),
  currency: z.enum(CURRENCY_OPTIONS, "Invalid currency"),
  billingCycle: z.enum(BILLING_CYCLE_OPTIONS, "Invalid billing cycle"),
  startDate: z.date("Start date is required"),
  category: z.string(),
})

export type CreateSubscriptionFormData = z.infer<
  typeof createSubscriptionSchema
>
export type UpdateSubscriptionFormData = z.infer<
  typeof updateSubscriptionSchema
>
