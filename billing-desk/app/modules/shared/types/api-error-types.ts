/**
 * A single validation error entry.
 * `field` is a JSON Pointer (RFC 6901):
 *   "#/currency"  → specific field error
 *   "#"           → whole-body / cross-field problem (malformed JSON, multi-field rules, etc.)
 *
 * `errors` is only present on 400 responses; other status codes (404, 409, 500, …)
 * only carry type/title/status/detail/instance.
 */
export interface ValidationError {
  field: string // JSON Pointer, e.g. "#/name", "#/currency", or "#" for body-level
  message: string
}

/**
 * RFC 9457 Problem Details type used by the backend.
 */
export interface ProblemDetails {
  type?: string // URI reference identifying the problem type
  title?: string // Short, human-readable summary
  status?: number // HTTP status code
  detail?: string // Human-readable explanation
  instance?: string // URI reference identifying the specific occurrence
  errors?: ValidationError[] // Present only on 400 validation responses
  [key: string]: unknown // Additional members allowed by RFC 9457
}

// Network error (no response from server)
export interface NetworkError {
  type: "network"
  message: string
}

// Timeout error (request took too long)
export interface TimeoutError {
  type: "timeout"
  message: string
}

// Union type for all possible errors
export type ApiError = ProblemDetails | NetworkError | TimeoutError
