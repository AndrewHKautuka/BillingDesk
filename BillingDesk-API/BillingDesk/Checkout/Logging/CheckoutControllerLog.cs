namespace BillingDesk.Checkout.Logging;

public static partial class CheckoutControllerLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Requesting payment for subscriptions due today")]
	public static partial void RequestingPaymentForSubscriptionsDueToday(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Information,
				   Message = "No active subscriptions are due today - skipping payment request")]
	public static partial void NoSubscriptionsDueToday(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "Payment request failed")]
	public static partial void PaymentRequestFailed(
		ILogger logger);
}
