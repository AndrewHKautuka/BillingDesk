namespace BillingDesk.Payment.Logging;

public static partial class OneKhusaPaymentServiceLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Requesting payment with reference number {ReferenceNumber} for amount {TransactionAmount}")]
	public static partial void RequestingPayment(
		ILogger logger,
		string referenceNumber,
		decimal transactionAmount);

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
}
