namespace BillingDesk.Subscription.Types.Results;

public abstract record DeleteSubscriptionResult
{
	public sealed record Success : DeleteSubscriptionResult;

	public sealed record NotFound(Guid Id) : DeleteSubscriptionResult;
}
