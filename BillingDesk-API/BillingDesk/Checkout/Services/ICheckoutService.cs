using BillingDesk.Checkout.Results;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Checkout.Services;

public interface ICheckoutService
{
	Task<RequestPaymentForSubscriptionsResult> RequestPaymentForSubscriptionsAsync(
		IList<SubscriptionModel> subscriptions,
		CancellationToken ct = default);
}
