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
	IValidator<UpdateSubscriptionRequest> updateRequestValidator)
	: ControllerBase
{
	[HttpPost]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			ValidationProblem,
			InternalServerError>>
		CreateSubscriptionAsync(
			[FromBody] CreateSubscriptionRequest request,
			CancellationToken ct = default)
	{
		var validationResult = await createRequestValidator.ValidateAsync(request,
																		  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.ValidationProblem(validationResult.ToDictionary());
		}

		var result = await subscriptionService.CreateSubscriptionAsync(
						 request.Adapt<CreateSubscriptionCommand>(),
						 ct);

		return result switch
		{
			CreateSubscriptionResult.Success r => TypedResults.Ok(r.Subscription),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpGet]
	public async Task<Results<
			Ok<IReadOnlyList<SubscriptionResponse>>,
			InternalServerError>>
		ListSubscriptionsAsync(
			[FromQuery] SubscriptionQuery query,
			CancellationToken ct = default)
	{
		var result = await subscriptionService.ListSubscriptionsAsync(
						 query.Adapt<ListSubscriptionsCommand>(),
						 ct);

		return result switch
		{
			ListSubscriptionsResult.Success r => TypedResults.Ok(r.Subscriptions),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpGet("{id:guid}")]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			NotFound,
			InternalServerError>>
		GetSubscriptionAsync(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
		var result = await subscriptionService.GetSubscriptionAsync(
						 id.Adapt<GetSubscriptionCommand>(),
						 ct);

		return result switch
		{
			GetSubscriptionResult.Success r => TypedResults.Ok(r.Subscription),
			GetSubscriptionResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpPut("{id:guid}")]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			ValidationProblem,
			NotFound,
			InternalServerError>>
		UpdateSubscriptionAsync(
			[FromRoute] Guid id,
			[FromBody] UpdateSubscriptionRequest request,
			CancellationToken ct = default)
	{
		var validationResult = await updateRequestValidator.ValidateAsync(request,
																		  ct);

		if (!validationResult.IsValid)
		{
			return TypedResults.ValidationProblem(validationResult.ToDictionary());
		}

		var result = await subscriptionService.UpdateSubscriptionAsync(
						 (id, request).Adapt<UpdateSubscriptionCommand>(),
						 ct);

		return result switch
		{
			UpdateSubscriptionResult.Success r => TypedResults.Ok(r.Subscription),
			UpdateSubscriptionResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}

	[HttpDelete("{id:guid}")]
	public async Task<Results<
			NoContent,
			NotFound,
			InternalServerError>>
		DeleteSubscriptionAsync(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
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
		ToggleSubscriptionStatusAsync(
			[FromRoute] Guid id,
			CancellationToken ct = default)
	{
		var result = await subscriptionService.ToggleSubscriptionStatusAsync(
						 id.Adapt<ToggleSubscriptionStatusCommand>(),
						 ct);

		return result switch
		{
			ToggleSubscriptionStatusResult.Success r => TypedResults.Ok(r.Subscription),
			ToggleSubscriptionStatusResult.NotFound => TypedResults.NotFound(),
			_ => TypedResults.InternalServerError()
		};
	}
}
