using OneKhusa.SDK.Models.Shared;
using OneKhusa.SDK.Models.Transactions.Collections;

namespace BillingDesk.Checkout.Types.Results;

public abstract record RequestPaymentForSubscriptionsResult
{
	public sealed record Success(
		RequestToPayResponse RequestToPayResponse,
		decimal TransactionAmount)
		: RequestPaymentForSubscriptionsResult;

	public sealed record PaymentRequestFailed(ApiErrorResponse ApiErrorResponse)
		: RequestPaymentForSubscriptionsResult;

	public sealed record UnknownFailure
		: RequestPaymentForSubscriptionsResult;
}
