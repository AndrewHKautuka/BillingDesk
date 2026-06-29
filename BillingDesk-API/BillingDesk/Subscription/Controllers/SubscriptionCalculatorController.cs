using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Enums;
using BillingDesk.Subscription.Types.Queries;
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
	IClock clock)
	: ControllerBase
{
	[HttpGet("upcoming")]
	public async Task<Results<
			Ok<IReadOnlyList<RenewalResponse>>,
			BadRequest,
			ValidationProblem,
			InternalServerError>>
		GetUpcomingRenewals(
			[FromQuery] UpcomingRenewalsQuery query,
			CancellationToken ct = default)
	{
		var validationResult = await upcomingRenewalsQueryValidator.ValidateAsync(query,
																				  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.ValidationProblem(validationResult.ToDictionary());
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
			GetUpcomingRenewalsResult.Success r => TypedResults.Ok(r.Renewals
																	.Adapt<IReadOnlyList<RenewalResponse>>()),
			GetUpcomingRenewalsResult.NegativeDaysAhead => TypedResults.BadRequest(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpGet("monthly-total")]
	public async Task<Results<
			Ok<MonthlyTotalResponse>,
			InternalServerError>>
		GetMonthlyTotal(
			CancellationToken ct = default)
	{
		var subscriptionsResult = await subscriptionService.ListSubscriptionsAsync(
									  new ListSubscriptionsCommand(SubscriptionStatus.Active),
									  ct);

		if (subscriptionsResult is not ListSubscriptionsResult.Success success)
		{
			return TypedResults.InternalServerError();
		}

		var result = subscriptionCalculatorService.GetMonthlySpending(success.Subscriptions);

		return result switch
		{
			GetMonthlySpendingResult.Success r => TypedResults.Ok(r.Total
																   .Adapt<MonthlyTotalResponse>()),
			_ => TypedResults.InternalServerError()
		};
	}
}
