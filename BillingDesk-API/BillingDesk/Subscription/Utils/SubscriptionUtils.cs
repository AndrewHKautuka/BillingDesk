using BillingDesk.Subscription.Constants;
using NodaTime;

namespace BillingDesk.Subscription.Utils;

public static class SubscriptionUtils
{
	public static LocalDate CalculateCutOffDate(LocalDate today)
	{
		return today.PlusYears(SubscriptionConstants.MaxStartDateYearsAhead);
	}
}
