using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record GetSubscriptionResult
{
	public sealed record Success(SubscriptionResponse Response)
		: GetSubscriptionResult;

	public sealed record NotFound(Guid Id) : GetSubscriptionResult;
}
