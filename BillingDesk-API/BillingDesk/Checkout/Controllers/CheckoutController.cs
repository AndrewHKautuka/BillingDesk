using BillingDesk.Checkout.Logging;
using BillingDesk.Checkout.Results;
using BillingDesk.Checkout.Services;
using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Results;
using BillingDesk.Subscription.Utils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NodaTime;
using OneKhusa.SDK.Models.Transactions.Collections;

namespace BillingDesk.Checkout.Controllers;

[ApiController]
[Route("/api/checkout")]
public sealed class CheckoutController(
	ISubscriptionService subscriptionService,
	ISubscriptionCalculatorService subscriptionCalculatorService,
	ICheckoutService checkoutService,
	IClock clock,
	ILogger<CheckoutController> logger)
	: ControllerBase
{
	[HttpPost("process-due-today")]
	public async Task<Results<
			Ok<RequestToPayResponse>,
			NoContent,
			ProblemHttpResult,
			InternalServerError>>
		ProcessSubscriptionsDueToday(
			CancellationToken ct = default)
	{
		CheckoutControllerLog.RequestingPaymentForSubscriptionsDueToday(logger);

		var listResult = await subscriptionService.ListSubscriptionsAsync(
							 new ListSubscriptionsCommand(null),
							 ct);

		if (listResult is not ListSubscriptionsResult.Success listSuccess)
		{
			return TypedResults.InternalServerError();
		}

		var today = DateUtils.GetToday(clock);

		var upcomingResult = subscriptionCalculatorService.GetUpcomingRenewals(
			listSuccess.Subscriptions,
			1,
			today);

		if (upcomingResult is not GetUpcomingRenewalsResult.Success renewalsSuccess)
		{
			return TypedResults.InternalServerError();
		}

		var subscriptionsDueToday = renewalsSuccess.Renewals
												   .Where(r => r.NextBillingDate == today)
												   .Select(r => r.Subscription)
												   .ToList();

		if (subscriptionsDueToday.Count == 0)
		{
			CheckoutControllerLog.NoSubscriptionsDueToday(logger);
			return TypedResults.NoContent();
		}

		var checkoutResult = await checkoutService.RequestPaymentForSubscriptionsAsync(
								 subscriptionsDueToday,
								 ct);

		return checkoutResult switch
		{
			RequestPaymentForSubscriptionsResult.Success r =>
				TypedResults.Ok(r.RequestToPayResponse),
			_ =>
				TypedResults.InternalServerError()
		};
	}
}
