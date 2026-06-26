using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Responses;

public sealed record SubscriptionResponse(
	Guid Id,
	string Name,
	decimal Cost,
	Currency Currency,
	BillingCycle BillingCycle,
	LocalDate StartDate,
	SubscriptionStatus Status,
	string Category);
