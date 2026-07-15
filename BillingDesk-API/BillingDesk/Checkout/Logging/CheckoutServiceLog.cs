namespace BillingDesk.Checkout.Logging;

public static partial class CheckoutServiceLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Calculating total cost for {SubscriptionCount} subscriptions")]
	public static partial void CalculatingTotalCost(
		ILogger logger,
		int subscriptionCount);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Total cost calculated as {TotalCost} MWK for {SubscriptionCount} subscriptions")]
	public static partial void TotalCostCalculated(
		ILogger logger,
		decimal totalCost,
		int subscriptionCount);

	[LoggerMessage(Level = LogLevel.Information,
				   Message = "Payment request succeeded for reference number {ReferenceNumber}")]
	public static partial void PaymentRequestSucceeded(
		ILogger logger,
		string referenceNumber);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "Payment request failed for reference number {ReferenceNumber}")]
	public static partial void PaymentRequestFailed(
		ILogger logger,
		string referenceNumber);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "Unexpected failure during payment request for reference number {ReferenceNumber}")]
	public static partial void UnknownFailure(
		ILogger logger,
		string referenceNumber);
}
