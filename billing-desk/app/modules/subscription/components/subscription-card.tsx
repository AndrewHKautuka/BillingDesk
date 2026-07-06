import type { Subscription } from "~/subscription/types/subscription-model"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SubscriptionCardProps {
  model: Subscription
}

export function SubscriptionCard({ model }: SubscriptionCardProps) {
  const active = model.status === "active"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{model.name}</CardTitle>
      </CardHeader>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="default">Edit</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline" className="col-span-2">
          {active ? "Mark as Unused" : "Reactivate"}
        </Button>
      </CardFooter>
    </Card>
  )
}
