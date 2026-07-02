using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record ListSubscriptionsResult
{
	public sealed record Success(IReadOnlyList<SubscriptionModel> Subscriptions)
		: ListSubscriptionsResult;
}
