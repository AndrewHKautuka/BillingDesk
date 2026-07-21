namespace BillingDesk.Subscription.Logging;

public static partial class SubscriptionCalculatorControllerLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Getting upcoming renewals")]
	public static partial void GettingUpcomingRenewals(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Getting monthly total")]
	public static partial void GettingMonthlyTotal(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Calculating monthly cost for {Count} subscription(s)")]
	public static partial void CalculatingMonthlyCost(
		ILogger logger,
		int count);

	[LoggerMessage(Level = LogLevel.Warning,
				   Message = "Validation failed in SubscriptionCalculatorController")]
	public static partial void ValidationFailed(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "Unexpected error occurred in SubscriptionCalculatorController")]
	public static partial void UnexpectedError(
		ILogger logger,
		Exception exception);
}
