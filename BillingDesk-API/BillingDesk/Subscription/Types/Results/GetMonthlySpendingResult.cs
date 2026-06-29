namespace BillingDesk.Subscription.Types.Results;

public abstract record GetMonthlySpendingResult
{
	public sealed record Success(decimal Total)
		: GetMonthlySpendingResult;
}
