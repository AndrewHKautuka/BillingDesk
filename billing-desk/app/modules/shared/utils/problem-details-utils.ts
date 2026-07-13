import type { FieldValues, Path, UseFormSetError } from "react-hook-form"
import type { ProblemDetails } from "~/shared/types/api-error-types"

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
