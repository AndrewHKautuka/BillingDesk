using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record ToggleSubscriptionStatusResult
{
	public sealed record Success(SubscriptionModel Subscription)
		: ToggleSubscriptionStatusResult;

	public sealed record NotFound(Guid Id) : ToggleSubscriptionStatusResult;
}
