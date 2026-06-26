using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Requests;

public sealed record UpdateSubscriptionRequest(
	string? Name,
	decimal? Cost,
	Currency? Currency,
	BillingCycle? BillingCycle,
	LocalDate? StartDate,
	string? Category);
