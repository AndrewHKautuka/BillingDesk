using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record ToggleSubscriptionStatusResult
{
	public sealed record Success(SubscriptionResponse Response)
		: ToggleSubscriptionStatusResult;

	public sealed record NotFound(Guid Id) : ToggleSubscriptionStatusResult;
}
