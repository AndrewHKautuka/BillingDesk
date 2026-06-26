using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Commands;

public sealed record UpdateSubscriptionCommand(
	Guid Id,
	string Name,
	decimal Cost,
	Currency Currency,
	BillingCycle BillingCycle,
	LocalDate StartDate,
	string Category);
