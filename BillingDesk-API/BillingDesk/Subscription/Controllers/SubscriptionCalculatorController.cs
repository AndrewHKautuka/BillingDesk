using BillingDesk.Common.Factories;
using BillingDesk.Subscription.Logging;
using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Enums;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Types.Responses;
using BillingDesk.Subscription.Types.Results;
using BillingDesk.Subscription.Utils;
using FluentValidation;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NodaTime;

namespace BillingDesk.Subscription.Controllers;

[ApiController]
[Route("/api/subscriptions")]
public sealed class SubscriptionCalculatorController(
	ISubscriptionService subscriptionService,
	ISubscriptionCalculatorService subscriptionCalculatorService,
	IValidator<UpcomingRenewalsQuery> upcomingRenewalsQueryValidator,
	IClock clock,
	ILogger<SubscriptionCalculatorController> logger)
	: ControllerBase
{
	[HttpGet("upcoming")]
	public async Task<Results<
			Ok<IReadOnlyList<RenewalResponse>>,
			BadRequest,
			ProblemHttpResult,
			InternalServerError>>
		GetUpcomingRenewals(
			[FromQuery] UpcomingRenewalsQuery query,
			CancellationToken ct = default)
	{
		SubscriptionCalculatorControllerLog.GettingUpcomingRenewals(logger);

		var validationResult = await upcomingRenewalsQueryValidator.ValidateAsync(query,
																				  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.Problem(
				ValidationProblemFactory.FromFluentValidation(validationResult, HttpContext.Request.Path));
		}

		var subscriptionsResult = await subscriptionService.ListSubscriptionsAsync(
									  new ListSubscriptionsCommand(SubscriptionStatus.Active),
									  ct);

		if (subscriptionsResult is not ListSubscriptionsResult.Success success)
		{
			return TypedResults.InternalServerError();
		}

		var result = subscriptionCalculatorService.GetUpcomingRenewals(success.Subscriptions,
																	   query.Days,
																	   DateUtils.GetToday(clock));

		return result switch
		{
			GetUpcomingRenewalsResult.Success r =>
				TypedResults.Ok(r.Renewals
								 .Adapt<IReadOnlyList<RenewalResponse>>()),
			GetUpcomingRenewalsResult.NegativeDaysAhead =>
				TypedResults.BadRequest(),
			_ =>
				TypedResults.InternalServerError()
		};
	}

	[HttpGet("monthly-total")]
	public async Task<Results<
			Ok<MonthlyTotalResponse>,
			InternalServerError>>
		GetMonthlyTotal(
			CancellationToken ct = default)
	{
		SubscriptionCalculatorControllerLog.GettingMonthlyTotal(logger);

		var subscriptionsResult = await subscriptionService.ListSubscriptionsAsync(
									  new ListSubscriptionsCommand(null),
									  ct);

		if (subscriptionsResult is not ListSubscriptionsResult.Success success)
		{
			return TypedResults.InternalServerError();
		}

		var result = subscriptionCalculatorService.GetMonthlySpending(success.Subscriptions);

		return result switch
		{
			GetMonthlySpendingResult.Success r =>
				TypedResults.Ok(r.Total
								 .Adapt<MonthlyTotalResponse>()),
			_ =>
				TypedResults.InternalServerError()
		};
	}

	[HttpPost("calculate-monthly-cost")]
	public async Task<Results<
			Ok<MonthlyTotalResponse>,
			InternalServerError>>
		CalculateMonthlyCost(
			[FromBody] CalculateMonthlyCostRequest request,
			CancellationToken ct = default)
	{
		SubscriptionCalculatorControllerLog.CalculatingMonthlyCost(logger,
																   request.SubscriptionIds.Count);

		var subscriptionsResult = await subscriptionService.ListSubscriptionsAsync(
									  new ListSubscriptionsCommand(null),
									  ct);

		if (subscriptionsResult is not ListSubscriptionsResult.Success success)
		{
			return TypedResults.InternalServerError();
		}

		var filtered = success.Subscriptions
							  .Where(s => request.SubscriptionIds
												 .Contains(s.Id))
							  .ToList();

		var result = subscriptionCalculatorService.GetMonthlySpending(filtered);

		return result switch
		{
			GetMonthlySpendingResult.Success r =>
				TypedResults.Ok(r.Total
								 .Adapt<MonthlyTotalResponse>()),
			_ =>
				TypedResults.InternalServerError()
		};
	}
}
