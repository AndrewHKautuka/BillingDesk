using System.Globalization;
using BillingDesk.Checkout.Results;
using BillingDesk.Payment.Services;
using BillingDesk.Payment.Types.Results;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Checkout.Services;

public sealed class CheckoutService(
	IPaymentService paymentService,
	IFxRateProvider rateProvider) : ICheckoutService
{
	public async Task<RequestPaymentForSubscriptionsResult> RequestPaymentForSubscriptionsAsync(
		IList<SubscriptionModel> subscriptions,
		CancellationToken ct = default)
	{
		var totalCost = subscriptions
			.Sum(s => rateProvider.GetRateToMwk(s.Currency) * s.Cost);

		var referenceNumber = "RN" + Guid.NewGuid()
										 .ToString("N")
										 .ToUpper(CultureInfo.InvariantCulture)
										 [..8];

		var transactionDescription = $"Transaction for {subscriptions.Count} subscriptions.";

		var result = await paymentService.RequestPaymentAsync(referenceNumber,
															  totalCost,
															  transactionDescription);

		return result switch
		{
			RequestPaymentResult.Success r =>
				new RequestPaymentForSubscriptionsResult.Success(r.RequestToPayResponse),
			RequestPaymentResult.Failed r =>
				new RequestPaymentForSubscriptionsResult.PaymentRequestFailed(r.ApiErrorResponse),
			_ =>
				new RequestPaymentForSubscriptionsResult.UnknownFailure()
		};
	}
}
