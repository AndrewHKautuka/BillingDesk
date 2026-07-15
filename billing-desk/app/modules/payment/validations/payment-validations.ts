import * as z from "zod"

import env from "@/config/env"

export const simulatePaymentSchema = z.object({
  connectorId: z.union(env.CONNECTORS.map(({ id }) => z.literal(id))),
})

export type SimulatePaymentFormData = z.infer<typeof simulatePaymentSchema>
