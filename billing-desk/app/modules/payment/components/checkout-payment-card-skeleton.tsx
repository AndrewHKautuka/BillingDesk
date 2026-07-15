import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CheckoutPaymentCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-1 h-4 w-56" />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* TAN */}
          <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-36" />
          </div>

          {/* Total */}
          <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-28" />
          </div>

          {/* Expiry */}
          <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
        <Skeleton className="h-9 w-40 rounded-md" />
      </CardContent>
    </Card>
  )
}
