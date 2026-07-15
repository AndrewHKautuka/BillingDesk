using System.Globalization;
using BillingDesk.Checkout.Logging;
using BillingDesk.Checkout.Types.Results;
using BillingDesk.Payment.Services;
using BillingDesk.Payment.Types.Results;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Checkout.Services;

public sealed class CheckoutService(
	IPaymentService paymentService,
	IFxRateProvider rateProvider,
	ILogger<CheckoutService> logger) : ICheckoutService
{
	public async Task<RequestPaymentForSubscriptionsResult> RequestPaymentForSubscriptionsAsync(
		IList<SubscriptionModel> subscriptions,
		CancellationToken ct = default)
	{
		CheckoutServiceLog.CalculatingTotalCost(logger, subscriptions.Count);

		var totalCost = subscriptions
			.Sum(s => rateProvider.GetRateToMwk(s.Currency) * s.Cost);

		CheckoutServiceLog.TotalCostCalculated(logger, totalCost, subscriptions.Count);

		var referenceNumber = "RN" + Guid.NewGuid()
										 .ToString("N")
										 .ToUpper(CultureInfo.InvariantCulture)
										 [..8];

		var transactionDescription = $"Transaction for {subscriptions.Count} subscriptions.";

		var result = await paymentService.RequestPaymentAsync(referenceNumber,
															  totalCost,
															  transactionDescription);

		switch (result)
		{
			case RequestPaymentResult.Success r:
				CheckoutServiceLog.PaymentRequestSucceeded(logger, referenceNumber);
				return new RequestPaymentForSubscriptionsResult.Success(r.RequestToPayResponse,
																		totalCost);

			case RequestPaymentResult.Failed r:
				CheckoutServiceLog.PaymentRequestFailed(logger, referenceNumber);
				return new RequestPaymentForSubscriptionsResult.PaymentRequestFailed(r.ApiErrorResponse);

			default:
				CheckoutServiceLog.UnknownFailure(logger, referenceNumber);
				return new RequestPaymentForSubscriptionsResult.UnknownFailure();
		}
	}
}
