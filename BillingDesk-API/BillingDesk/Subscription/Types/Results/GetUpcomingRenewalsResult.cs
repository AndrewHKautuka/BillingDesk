using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Subscription.Types.Results;

public abstract record GetUpcomingRenewalsResult
{
	public sealed record Success(IReadOnlyList<RenewalResponse> Renewals)
		: GetUpcomingRenewalsResult;

	public sealed record NegativeDaysAhead : GetUpcomingRenewalsResult;
}
