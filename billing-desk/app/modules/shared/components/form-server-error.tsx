import { AlertOctagonIcon } from "lucide-react"
import type { GlobalError } from "react-hook-form"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormServerErrorProps {
  serverError?: GlobalError
}

export function FormServerError({ serverError }: FormServerErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertOctagonIcon />
      <AlertTitle>Cross-Field/Wide-Form Error</AlertTitle>
      <AlertDescription>{serverError?.message}</AlertDescription>
    </Alert>
  )
}
