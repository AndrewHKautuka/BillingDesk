using BillingDesk.Common.Factories;
using BillingDesk.Subscription.Logging;
using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Types.Responses;
using BillingDesk.Subscription.Types.Results;
using FluentValidation;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BillingDesk.Subscription.Controllers;

[ApiController]
[Route("/api/subscriptions")]
public sealed class SubscriptionController(
	ISubscriptionService subscriptionService,
	IValidator<CreateSubscriptionRequest> createRequestValidator,
	IValidator<UpdateSubscriptionRequest> updateRequestValidator,
	ILogger<SubscriptionController> logger)
	: ControllerBase
{
	[HttpPost]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			ProblemHttpResult,
			InternalServerError>>
		CreateSubscription(
			[FromBody] CreateSubscriptionRequest request,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.CreatingSubscription(logger);

		var validationResult = await createRequestValidator.ValidateAsync(request,
																		  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.Problem(
				ValidationProblemFactory.FromFluentValidation(validationResult, HttpContext.Request.Path));
		}

		var result = await subscriptionService.CreateSubscriptionAsync(
						 request.Adapt<CreateSubscriptionCommand>(),
						 ct);

		return result switch
		{
			CreateSubscriptionResult.Success r => TypedResults.Ok(r.Subscription
																   .Adapt<SubscriptionResponse>()),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpGet]
	public async Task<Results<
			Ok<IReadOnlyList<SubscriptionResponse>>,
			InternalServerError>>
		ListSubscriptions(
			[FromQuery] SubscriptionQuery query,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.ListingSubscriptions(logger);

		var result = await subscriptionService.ListSubscriptionsAsync(
						 query.Adapt<ListSubscriptionsCommand>(),
						 ct);

		return result switch
		{
			ListSubscriptionsResult.Success r => TypedResults.Ok(r.Subscriptions
																  .Adapt<IReadOnlyList<SubscriptionResponse>>()),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpGet("{id:guid}")]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			NotFound,
			InternalServerError>>
		GetSubscription(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.GettingSubscription(logger, id);

		var result = await subscriptionService.GetSubscriptionAsync(
						 id.Adapt<GetSubscriptionCommand>(),
						 ct);

		return result switch
		{
			GetSubscriptionResult.Success r => TypedResults.Ok(r.Subscription
																.Adapt<SubscriptionResponse>()),
			GetSubscriptionResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpPut("{id:guid}")]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			ProblemHttpResult,
			NotFound,
			InternalServerError>>
		UpdateSubscription(
			[FromRoute] Guid id,
			[FromBody] UpdateSubscriptionRequest request,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.UpdatingSubscription(logger, id);

		var validationResult = await updateRequestValidator.ValidateAsync(request,
																		  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.Problem(
				ValidationProblemFactory.FromFluentValidation(validationResult, HttpContext.Request.Path));
		}

		var result = await subscriptionService.UpdateSubscriptionAsync(
						 (id, request).Adapt<UpdateSubscriptionCommand>(),
						 ct);

		return result switch
		{
			UpdateSubscriptionResult.Success r => TypedResults.Ok(r.Subscription
																   .Adapt<SubscriptionResponse>()),
			UpdateSubscriptionResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpDelete("{id:guid}")]
	public async Task<Results<
			NoContent,
			NotFound,
			InternalServerError>>
		DeleteSubscription(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.DeletingSubscription(logger, id);

		var result = await subscriptionService.DeleteSubscriptionAsync(
						 id.Adapt<DeleteSubscriptionCommand>(),
						 ct);

		return result switch
		{
			DeleteSubscriptionResult.Success => TypedResults.NoContent(),
			DeleteSubscriptionResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpPatch("{id:guid}/toggle-status")]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			NotFound,
			InternalServerError>>
		ToggleSubscriptionStatus(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
		SubscriptionControllerLog.TogglingSubscriptionStatus(logger, id);

		var result = await subscriptionService.ToggleSubscriptionStatusAsync(
						 id.Adapt<ToggleSubscriptionStatusCommand>(),
						 ct);

		return result switch
		{
			ToggleSubscriptionStatusResult.Success r => TypedResults.Ok(r.Subscription
																		 .Adapt<SubscriptionResponse>()),
			ToggleSubscriptionStatusResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}
}
