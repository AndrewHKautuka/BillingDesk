using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record UpdateSubscriptionResult
{
	public sealed record Success(SubscriptionModel Subscription)
		: UpdateSubscriptionResult;

	public sealed record NotFound(Guid Id) : UpdateSubscriptionResult;
}
