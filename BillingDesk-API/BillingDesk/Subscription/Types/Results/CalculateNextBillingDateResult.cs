using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record CalculateNextBillingDateResult
{
	public sealed record Success(BillingDateResponse Response)
		: CalculateNextBillingDateResult;
}
