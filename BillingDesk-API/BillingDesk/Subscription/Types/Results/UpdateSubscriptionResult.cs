using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record UpdateSubscriptionResult
{
	public sealed record Success(SubscriptionResponse Subscription)
		: UpdateSubscriptionResult;

	public sealed record NotFound(Guid Id) : UpdateSubscriptionResult;
}
