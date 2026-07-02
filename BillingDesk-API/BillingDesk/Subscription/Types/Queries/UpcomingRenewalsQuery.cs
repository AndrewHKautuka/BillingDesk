using BillingDesk.Subscription.Constants;

namespace BillingDesk.Subscription.Types.Queries;

public sealed record UpcomingRenewalsQuery
{
	public int Days { get; init; } = SubscriptionConstants.DefaultUpcomingDaysAhead;
}
