using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Subscription.Types.Commands;

public sealed record ListSubscriptionsCommand(SubscriptionStatus? Status);
