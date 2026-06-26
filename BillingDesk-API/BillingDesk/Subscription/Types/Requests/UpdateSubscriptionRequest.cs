using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Requests;

public record UpdateSubscriptionRequest(
	string? Name,
	decimal? Cost,
	Currency? Currency,
	BillingCycle? BillingCycle,
	LocalDate? StartDate,
	string? Category);
