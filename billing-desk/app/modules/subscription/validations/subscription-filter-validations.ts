import * as z from "zod"
import { LOOKAHEAD_OPTIONS } from "~/subscription/constants/subscription-constants"

export const upcomingRenewalsFilters = z.object({
  lookAheadDays: z.union(LOOKAHEAD_OPTIONS.map((n) => z.literal(n))),
})

export type UpcomingRenewalsFilters = z.infer<typeof upcomingRenewalsFilters>
