using NodaTime;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Types.Results;

public abstract record GetUpcomingRenewalsResult
{
	public sealed record Success(
		IReadOnlyList<(SubscriptionModel Subscription, LocalDate NextBillingDate)> Renewals)
		: GetUpcomingRenewalsResult;

	public sealed record NegativeDaysAhead : GetUpcomingRenewalsResult;
}
