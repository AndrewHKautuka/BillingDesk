import { Card, CardContent } from "@/components/ui/card"

interface MonthlySpendingCardProps {
  totalMonthlySpending: string
}

export function MonthlySpendingCard({
  totalMonthlySpending,
}: MonthlySpendingCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <span className="text-2xl font-light text-muted-foreground">
          Total monthly spending:
        </span>

        <span className="text-5xl font-semibold text-primary">
          {totalMonthlySpending}
        </span>
      </CardContent>
    </Card>
  )
}
