import * as z from "zod"
import type { Connector } from "~/payment/types/payment-types"

import { removeVitePrefix } from "@/lib/utils"

/**
 * Parses a VITE_CONNECTORS string of the form:
 *   "123456:Name One,234567:Name Two"
 * into an array of Connector pairs.
 *
 * Rules:
 *   - At least one entry required.
 *   - id must be a 6-digit positive integer.
 *   - name must be a non-empty string.
 */
const connectorEntrySchema = z.string().transform((raw, ctx) => {
  const entries = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  if (entries.length === 0) {
    ctx.addIssue({
      code: "custom",
      message: "VITE_CONNECTORS must contain at least one connector entry.",
    })
    return z.NEVER
  }

  const parsed: Connector[] = []

  for (const entry of entries) {
    const colonIdx = entry.indexOf(":")
    if (colonIdx === -1) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid connector entry. Expected format: "<id>:<name>".`,
        input: entry,
      })
      return z.NEVER
    }

    const rawId = entry.slice(0, colonIdx).trim()
    const name = entry.slice(colonIdx + 1).trim()

    if (!/^\d{6}$/.test(rawId)) {
      ctx.addIssue({
        code: "custom",
        message: `Connector id must be a 6-digit positive integer.`,
        input: rawId,
      })
      return z.NEVER
    }

    if (!name) {
      ctx.addIssue({
        code: "custom",
        message: `Connector name for id "${rawId}" must not be empty.`,
      })
      return z.NEVER
    }

    const id = parseInt(rawId, 10)
    parsed.push({ id, name })
  }

  return parsed
})

const envSchema = z.object({
  API_URL: z.url("VITE_API_URL must be a valid URL"),
  CONNECTORS: connectorEntrySchema,
})

// Perform validation immediately so that invalid configurations fail fast.
const _env = envSchema.safeParse(removeVitePrefix(import.meta.env))

if (!_env.success) {
  const error = z.treeifyError(_env.error).properties
  console.error(
    "❌ Invalid environment variables",
    JSON.stringify(error, null, 2)
  )
  throw new Error("Invalid environment variables")
}

const env = Object.freeze(_env.data)
export default env

type Env = typeof env
export type { Env }
