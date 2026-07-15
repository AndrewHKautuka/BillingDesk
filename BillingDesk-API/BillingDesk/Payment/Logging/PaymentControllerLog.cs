namespace BillingDesk.Payment.Logging;

public static partial class PaymentControllerLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Simulating acceptance of request to pay for timed account {TimedAccountNumber}")]
	public static partial void SimulatingAcceptRequestToPay(
		ILogger logger,
		string timedAccountNumber);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "Simulate accept request to pay failed")]
	public static partial void SimulateAcceptRequestToPayFailed(
		ILogger logger);
}
