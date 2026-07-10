import { PackageOpenIcon } from "lucide-react"
import { AddSubscriptionDialogTrigger } from "~/subscription/components/add-subscription-dialog-trigger"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface SubscriptionsDisplayEmptyProps {
  handleAddSubscription: () => void
}

export function SubscriptionsDisplayEmpty({
  handleAddSubscription,
}: SubscriptionsDisplayEmptyProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon className="size-12 text-muted-foreground" />
        </EmptyMedia>

        <EmptyTitle className="font-semibold">No subscriptions yet</EmptyTitle>

        <EmptyDescription>
          Add your first subscription to start tracking your recurring payments.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <AddSubscriptionDialogTrigger
          handleAddSubscription={handleAddSubscription}
        />
      </EmptyContent>
    </Empty>
  )
}
