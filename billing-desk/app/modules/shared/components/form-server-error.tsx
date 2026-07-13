import { AlertOctagonIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormServerErrorProps {
  message?: string
}

export function FormServerError({ message }: FormServerErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertOctagonIcon />
      <AlertTitle>Cross-Field/Wide-Form Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
