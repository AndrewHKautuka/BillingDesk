using OneKhusa.SDK.Models.Shared;
using OneKhusa.SDK.Models.Transactions.Collections;

namespace BillingDesk.Payment.Types.Results;

public abstract record RequestPaymentResult
{
	public sealed record Success(RequestToPayResponse RequestToPayResponse)
		: RequestPaymentResult;

	public sealed record Failed(ApiErrorResponse ApiErrorResponse)
		: RequestPaymentResult;
}
