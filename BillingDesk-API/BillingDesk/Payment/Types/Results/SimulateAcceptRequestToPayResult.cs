using OneKhusa.SDK.Models.Shared;

namespace BillingDesk.Payment.Types.Results;

public abstract record SimulateAcceptRequestToPayResult
{
	public sealed record Success
		: SimulateAcceptRequestToPayResult;

	public sealed record Failed(ApiErrorResponse ApiErrorResponse)
		: SimulateAcceptRequestToPayResult;
}
