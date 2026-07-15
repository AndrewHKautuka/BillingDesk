import { FlaskConicalIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SimulatePaymentCardPlaceholder() {
  return (
    <Card className="border-dashed opacity-60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground">
          <FlaskConicalIcon className="size-5" />
          Simulate Payment
        </CardTitle>

        <CardDescription>
          Request a payment session first to unlock payment simulation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Once a payment session is active, you can simulate the payment being
          accepted here.
        </p>
      </CardContent>
    </Card>
  )
}
