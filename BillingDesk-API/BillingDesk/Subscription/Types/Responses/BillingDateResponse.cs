using NodaTime;

namespace BillingDesk.Subscription.Types.Responses;

public sealed record BillingDateResponse(LocalDate NextBillingDate);
