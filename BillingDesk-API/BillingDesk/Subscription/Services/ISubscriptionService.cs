using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Results;

namespace BillingDesk.Subscription.Services;

public interface ISubscriptionService
{
	Task<CreateSubscriptionResult> CreateAsync(
		CreateSubscriptionCommand command,
		CancellationToken ct = default);

	Task<ListSubscriptionsResult> ListSubscriptionsAsync(
		ListSubscriptionsCommand command,
		CancellationToken ct = default);

	Task<GetSubscriptionResult> GetSubscriptionAsync(
		GetSubscriptionCommand command,
		CancellationToken ct = default);

	Task<UpdateSubscriptionResult> UpdateAsync(
		UpdateSubscriptionCommand command,
		CancellationToken ct = default);

	Task<DeleteSubscriptionResult> DeleteAsync(
		DeleteSubscriptionCommand command,
		CancellationToken ct = default);

	Task<ToggleSubscriptionStatusResult> ToggleStatusAsync(
		ToggleSubscriptionStatusCommand command,
		CancellationToken ct = default);
}
