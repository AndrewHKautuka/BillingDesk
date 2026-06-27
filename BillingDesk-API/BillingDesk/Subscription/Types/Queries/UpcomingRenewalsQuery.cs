using BillingDesk.Subscription.Constants;

namespace BillingDesk.Subscription.Types.Queries;

public sealed record UpcomingRenewalsQuery(
	uint Days = SubscriptionConstants.DefaultUpcomingDaysAhead);
