using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record CreateSubscriptionResult
{
	public sealed record Success(SubscriptionResponse Subscription)
		: CreateSubscriptionResult;
}
