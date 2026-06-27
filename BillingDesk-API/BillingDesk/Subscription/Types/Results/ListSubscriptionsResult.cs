using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record ListSubscriptionsResult
{
	public sealed record Success(IReadOnlyList<SubscriptionResponse> Subscriptions)
		: ListSubscriptionsResult;
}
