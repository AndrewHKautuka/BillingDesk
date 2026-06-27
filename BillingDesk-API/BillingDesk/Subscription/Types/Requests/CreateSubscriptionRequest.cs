using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Requests;

public sealed record CreateSubscriptionRequest
{
	public required string Name { get; init; }
	public required decimal Cost { get; init; }
	public required Currency Currency { get; init; }
	public required BillingCycle BillingCycle { get; init; }
	public required LocalDate StartDate { get; set; }
	public required string Category { get; init; }
}
