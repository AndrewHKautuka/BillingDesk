import { PlusCircleIcon } from "lucide-react"
import { DIALOG_TRIGGER_CLASS_NAME } from "~/subscription/constants/subscription-constants"

import { Button } from "@/components/ui/button"

interface AddSubscriptionDialogTriggerProps {
  handleAddSubscription: () => void
  disabled?: boolean
}

export function AddSubscriptionDialogTrigger({
  handleAddSubscription,
  disabled,
}: AddSubscriptionDialogTriggerProps) {
  return (
    <Button
      variant="default"
      className={DIALOG_TRIGGER_CLASS_NAME}
      onClick={handleAddSubscription}
      disabled={disabled}
    >
      <PlusCircleIcon />
      <span>Add Subscription</span>
    </Button>
  )
}
