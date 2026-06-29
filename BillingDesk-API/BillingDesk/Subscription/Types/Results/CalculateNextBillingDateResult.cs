using NodaTime;

namespace BillingDesk.Subscription.Types.Results;

public abstract record CalculateNextBillingDateResult
{
	public sealed record Success(LocalDate NextBillingDate)
		: CalculateNextBillingDateResult;
}
