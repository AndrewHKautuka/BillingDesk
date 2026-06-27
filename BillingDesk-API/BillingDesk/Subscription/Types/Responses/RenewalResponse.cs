namespace BillingDesk.Subscription.Types.Responses;

public sealed record RenewalResponse(
	SubscriptionResponse Subscription,
	BillingDateResponse NextBillingDate);
