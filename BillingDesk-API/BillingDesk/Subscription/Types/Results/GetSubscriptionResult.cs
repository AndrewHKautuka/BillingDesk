using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record GetSubscriptionResult
{
	public sealed record Success(SubscriptionModel Subscription)
		: GetSubscriptionResult;

	public sealed record NotFound(Guid Id) : GetSubscriptionResult;
}
