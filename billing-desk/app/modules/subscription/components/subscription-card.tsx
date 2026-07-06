import type { Subscription } from "~/subscription/types/subscription-model"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface SubscriptionCardProps {
  model: Subscription
}

export function SubscriptionCard({ model }: SubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{model.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}
