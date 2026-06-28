using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Types.Responses;
using BillingDesk.Subscription.Types.Results;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BillingDesk.Subscription.Controller;

[ApiController]
[Route("/api/subscriptions")]
public sealed class SubscriptionController(ISubscriptionService subscriptionService) : ControllerBase
{
	[HttpPost]
	public async Task<Results<
			Ok<SubscriptionResponse>,
			InternalServerError>>
		CreateSubscriptionAsync(
			[FromBody] CreateSubscriptionRequest request,
			CancellationToken ct = default)
	{
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
}
