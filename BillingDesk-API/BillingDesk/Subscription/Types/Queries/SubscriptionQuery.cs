using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Subscription.Types.Queries;

public sealed record SubscriptionQuery
{
	public SubscriptionStatus? Status { get; init; }
}
