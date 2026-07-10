import { PackageOpenIcon, PlusCircleIcon } from "lucide-react"
import { DIALOG_TRIGGER_CLASS_NAME } from "~/subscription/constants/subscription-constants"

import { Button } from "@/components/ui/button"
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
        <Button
          variant="default"
          className={DIALOG_TRIGGER_CLASS_NAME}
          onClick={handleAddSubscription}
        >
          <PlusCircleIcon />
          <span>Add Subscription</span>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
