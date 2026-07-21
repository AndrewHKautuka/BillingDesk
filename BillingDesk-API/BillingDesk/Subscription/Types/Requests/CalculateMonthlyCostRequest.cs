namespace BillingDesk.Subscription.Types.Requests;

public sealed record CalculateMonthlyCostRequest
{
	public required IReadOnlyList<Guid> SubscriptionIds { get; init; }
}
