using BillingDesk.Payment.Types.Configs;
using BillingDesk.Payment.Types.Results;
using OneKhusa.SDK;
using OneKhusa.SDK.Models.Configurations;
using OneKhusa.SDK.Models.Transactions.Collections;

namespace BillingDesk.Payment.Services;

public sealed class OneKhusaPaymentService(
	IOneKhusaClient oneKhusaClient,
	OneKhusaOptions oneKhusaOptions,
	OneKhusaMerchantEmail oneKhusaMerchantEmail) : IPaymentService
{
	public async Task<RequestPaymentResult> RequestPaymentAsync(
		string referenceNumber,
		decimal transactionAmount,
		string transactionDescription)
	{
		var response = await oneKhusaClient
							 .Transactions
							 .Collections
							 .CreateRequestToPayAsync(
								 new RequestToPayRequest
								 {
									 MerchantAccountNumber = oneKhusaOptions.MerchantAccountNumber,
									 ReferenceNumber = referenceNumber,
									 TransactionAmount = transactionAmount,
									 TransactionDescription = transactionDescription,
									 CapturedBy = oneKhusaMerchantEmail.Email
								 });

		if (response.IsSuccess)
		{
			return new RequestPaymentResult.Success(response.Data!);
		}

		return new RequestPaymentResult.Failed(response.Error!);
	}
}
