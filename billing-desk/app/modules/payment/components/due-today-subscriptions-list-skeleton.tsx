import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function SubscriptionRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="h-5 w-16" />
    </div>
  )
}

export function DueTodaySubscriptionsListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="mt-1 h-4 w-36" />
      </CardHeader>

      <CardContent className="divide-y divide-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <SubscriptionRowSkeleton key={i} />
        ))}
      </CardContent>
    </Card>
  )
}
