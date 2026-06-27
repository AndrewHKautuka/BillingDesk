using BillingDesk.Common;
using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Enums;
using BillingDesk.Subscription.Types.Responses;
using BillingDesk.Subscription.Types.Results;
using Mapster;
using Microsoft.EntityFrameworkCore;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Services;

public sealed class SubscriptionService(BillingDeskDbContext dbContext)
	: ISubscriptionService
{
	public async Task<CreateSubscriptionResult> CreateSubscriptionAsync(
		CreateSubscriptionCommand command,
		CancellationToken ct = default)
	{
		var newSubscription = command.Adapt<SubscriptionModel>();

		dbContext.Subscription
				 .Add(newSubscription);
		await dbContext.SaveChangesAsync(ct);

		return new CreateSubscriptionResult.Success(newSubscription.Adapt<SubscriptionResponse>());
	}

	public async Task<ListSubscriptionsResult> ListSubscriptionsAsync(
		ListSubscriptionsCommand command,
		CancellationToken ct = default)
	{
		var query = dbContext.Subscription
							 .AsNoTracking();

		if (command.Status is not null)
		{
			query = query.Where(s => s.Status == command.Status);
		}

		var subscriptions = await query
								  .ProjectToType<SubscriptionResponse>()
								  .ToListAsync(ct);

		return new ListSubscriptionsResult.Success(subscriptions);
	}

	public async Task<GetSubscriptionResult> GetSubscriptionAsync(
		GetSubscriptionCommand command,
		CancellationToken ct = default)
	{
		var subscription = await dbContext.Subscription
										  .AsNoTracking()
										  .Where(e => e.Id == command.Id)
										  .ProjectToType<SubscriptionResponse>()
										  .FirstOrDefaultAsync(ct);

		if (subscription is null)
		{
			return new GetSubscriptionResult.NotFound(command.Id);
		}

		return new GetSubscriptionResult.Success(subscription);
	}

	public async Task<UpdateSubscriptionResult> UpdateSubscriptionAsync(
		UpdateSubscriptionCommand command,
		CancellationToken ct = default)
	{
		var existingSubscription = await dbContext.Subscription
												  .AsNoTracking()
												  .Where(e => e.Id == command.Id)
												  .FirstOrDefaultAsync(ct);

		if (existingSubscription is null)
		{
			return new UpdateSubscriptionResult.NotFound(command.Id);
		}

		var updatedSubscription = command.Adapt<SubscriptionModel>();

		dbContext.Subscription
				 .Update(updatedSubscription);
		await dbContext.SaveChangesAsync(ct);

		return new UpdateSubscriptionResult.Success(updatedSubscription.Adapt<SubscriptionResponse>());
	}

	public async Task<ToggleSubscriptionStatusResult> ToggleSubscriptionStatusAsync(
		ToggleSubscriptionStatusCommand command,
		CancellationToken ct = default)
	{
		var subscription = await dbContext.Subscription
										  .AsNoTracking()
										  .Where(e => e.Id == command.Id)
										  .FirstOrDefaultAsync(ct);

		if (subscription is null)
		{
			return new ToggleSubscriptionStatusResult.NotFound(command.Id);
		}

		subscription.Status = subscription.Status switch
		{
			SubscriptionStatus.Active => SubscriptionStatus.Inactive,
			SubscriptionStatus.Inactive => SubscriptionStatus.Active,
			_ => throw new ArgumentException(
					 $"Illegal subscription status: {subscription.Status}") // Should not be possible to reach
		};
		await dbContext.SaveChangesAsync(ct);

		var response = subscription.Adapt<SubscriptionResponse>();

		return new ToggleSubscriptionStatusResult.Success(response);
	}

	public async Task<DeleteSubscriptionResult> DeleteSubscriptionAsync(
		DeleteSubscriptionCommand command,
		CancellationToken ct = default)
	{
		var subscription = await dbContext.Subscription
										  .AsNoTracking()
										  .Where(e => e.Id == command.Id)
										  .FirstOrDefaultAsync(ct);

		if (subscription is null)
		{
			return new DeleteSubscriptionResult.NotFound(command.Id);
		}

		dbContext.Subscription
				 .Remove(subscription);
		await dbContext.SaveChangesAsync(ct);

		return new DeleteSubscriptionResult.Success();
	}
}
