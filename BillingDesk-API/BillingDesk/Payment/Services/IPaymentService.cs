using BillingDesk.Payment.Types.Results;

namespace BillingDesk.Payment.Services;

public interface IPaymentService
{
	Task<RequestPaymentResult> RequestPaymentAsync(
		string referenceNumber,
		decimal transactionAmount,
		string transactionDescription);
}
