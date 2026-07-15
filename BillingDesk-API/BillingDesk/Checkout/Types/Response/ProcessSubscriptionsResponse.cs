using BillingDesk.Subscription.Types.Responses;

namespace BillingDesk.Checkout.Types.Response;

public sealed record ProcessSubscriptionsResponse(
	IReadOnlyList<SubscriptionResponse> Subscriptions,
	decimal TransactionAmount,
	string TimedAccountNumber,
	DateTime ExpiryDate /* using DateTime rather than NodaTime.Instant as it is
						 * not clear what type is returned by OneKhusa client */
);
