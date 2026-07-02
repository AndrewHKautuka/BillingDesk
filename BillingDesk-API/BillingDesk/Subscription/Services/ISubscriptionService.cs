using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Results;

namespace BillingDesk.Subscription.Services;

public interface ISubscriptionService
{
	Task<CreateSubscriptionResult> CreateSubscriptionAsync(
		CreateSubscriptionCommand command,
		CancellationToken ct = default);

	Task<ListSubscriptionsResult> ListSubscriptionsAsync(
		ListSubscriptionsCommand command,
		CancellationToken ct = default);

	Task<GetSubscriptionResult> GetSubscriptionAsync(
		GetSubscriptionCommand command,
		CancellationToken ct = default);

	Task<UpdateSubscriptionResult> UpdateSubscriptionAsync(
		UpdateSubscriptionCommand command,
		CancellationToken ct = default);

	Task<DeleteSubscriptionResult> DeleteSubscriptionAsync(
		DeleteSubscriptionCommand command,
		CancellationToken ct = default);

	Task<ToggleSubscriptionStatusResult> ToggleSubscriptionStatusAsync(
		ToggleSubscriptionStatusCommand command,
		CancellationToken ct = default);
}
