using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record GetMonthlySpendingResult
{
	public sealed record Success(MonthlyTotalResponse Total)
		: GetMonthlySpendingResult;
}
