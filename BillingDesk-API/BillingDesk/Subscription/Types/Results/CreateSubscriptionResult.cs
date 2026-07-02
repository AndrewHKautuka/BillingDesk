using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record CreateSubscriptionResult
{
	public sealed record Success(SubscriptionModel Subscription)
		: CreateSubscriptionResult;
}
