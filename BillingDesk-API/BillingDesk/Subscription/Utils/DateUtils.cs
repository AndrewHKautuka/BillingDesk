using BillingDesk.Subscription.Constants;
using NodaTime;

namespace BillingDesk.Subscription.Utils;

public static class DateUtils
{
	public static LocalDate GetToday(IClock clock)
	{
		return clock.GetCurrentInstant()
					.InUtc()
					.Date;
	}

	public static LocalDate CalculateCutOffDate(LocalDate referenceDate)
	{
		return referenceDate.PlusYears(SubscriptionConstants.MaxStartDateYearsAhead);
	}
}
