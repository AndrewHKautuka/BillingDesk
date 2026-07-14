import type { FieldValues, Path, UseFormSetError } from "react-hook-form"
import type {
  ApiError,
  NetworkError,
  ProblemDetails,
  TimeoutError,
} from "~/shared/types/api-error-types"

export function isNetworkError(error: unknown): error is NetworkError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as NetworkError).type === "network"
  )
}

export function isTimeoutError(error: unknown): error is TimeoutError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as TimeoutError).type === "timeout"
  )
}

export function isProblemDetails(error: unknown): error is ProblemDetails {
  return (
    typeof error === "object" &&
    error !== null &&
    !isNetworkError(error) &&
    !isTimeoutError(error)
  )
}

/**
 * Returns a human-readable message for any `ApiError`.
 * Falls back to a generic string if no descriptive field is available.
 */
export function getApiErrorMessage(error: ApiError): string {
  if (isNetworkError(error) || isTimeoutError(error)) {
    return error.message
  }

  // ProblemDetails: prefer `detail`, then `title`, then a generic fallback
  return error.detail ?? error.title ?? "An unexpected error occurred."
}

/**
 * Applies a ProblemDetails 400 response's `errors` array onto a React Hook Form
 * instance. Field pointers are converted from JSON Pointer format to RHF dot-paths:
 *   "#/billingCycle"  →  "billingCycle"
 *   "#/address/city"  →  "address.city"
 *   "#"               →  "root.serverError"  (whole-body / cross-field error)
 *
 * @param setError - The `setError` function from `useForm()`
 * @param problem - A ProblemDetails object (typically from a 400 response)
 */
export function applyServerValidationErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  problem: ProblemDetails
): void {
  for (const { field, message } of problem.errors ?? []) {
    const target =
      field === "#"
        ? "root.serverError"
        : field.replace(/^#\//, "").replaceAll("/", ".")

    setError(target as Path<T>, { type: "server", message })
  }
}
