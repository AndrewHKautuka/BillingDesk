using BillingDesk.Subscription.Constants;

namespace BillingDesk.Subscription.Types.Queries;

public record UpcomingRenewalsQuery(
	uint Days = SubscriptionConstants.DefaultUpcomingDaysAhead);
