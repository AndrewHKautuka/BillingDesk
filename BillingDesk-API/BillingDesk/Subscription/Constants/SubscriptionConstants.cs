namespace BillingDesk.Subscription.Constants;

public static class SubscriptionConstants
{
	public const int DefaultUpcomingDaysAhead = 7;
	public const int MaxStartDateYearsAhead = 1;

	public const string InvalidCurrencyMessage = "Currency must be one of the following values: USD, MWK, EUR.";
	public const string InvalidBillingCycleMessage = "BillingCycle must be one of the following values: Monthly, Yearly.";
	public const string InvalidStartDateMessage = "StartDate cannot be more than 1 year in the future.";
}
