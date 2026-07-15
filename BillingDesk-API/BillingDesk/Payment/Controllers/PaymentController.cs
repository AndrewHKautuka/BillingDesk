using BillingDesk.Payment.Logging;
using BillingDesk.Payment.Services;
using BillingDesk.Payment.Types.Requests;
using BillingDesk.Payment.Types.Results;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BillingDesk.Payment.Controllers;

[ApiController]
[Route("/api/payment")]
public sealed class PaymentController(
	IPaymentService paymentService,
	ILogger<PaymentController> logger)
	: ControllerBase
{
	[HttpPost("simulate/accept-request-to-pay")]
	public async Task<Results<
			NoContent,
			ProblemHttpResult,
			InternalServerError>>
		SimulateAcceptRequestToPay(
			[FromBody] SimulateAcceptRequestToPayRequest request)
	{
		PaymentControllerLog.SimulatingAcceptRequestToPay(logger, request.TimedAccountNumber);

		var result = await paymentService.SimulateAcceptRequestToPayAsync(
						 request.TimedAccountNumber,
						 request.TransactionAmount,
						 request.ConnectorId);

		return result switch
		{
			SimulateAcceptRequestToPayResult.Success =>
				TypedResults.NoContent(),
			SimulateAcceptRequestToPayResult.Failed r =>
				TypedResults.Problem(r.ApiErrorResponse.Adapt<ProblemDetails>()),
			_ =>
				TypedResults.InternalServerError()
		};
	}
}
