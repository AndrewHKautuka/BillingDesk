import { Skeleton } from "@/components/ui/skeleton"

export function SameDayUpcomingRenewalsBannerSkeleton() {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border px-4 py-3">
      <Skeleton className="mt-0.5 size-5 shrink-0 rounded-sm" />

      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-5 w-72 rounded" />

        <div className="mt-1 flex flex-col gap-1">
          <Skeleton className="h-4 w-56 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
        </div>
      </div>
    </div>
  )
}
