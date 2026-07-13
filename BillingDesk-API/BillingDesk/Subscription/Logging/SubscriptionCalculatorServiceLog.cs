using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Logging;

public static partial class SubscriptionCalculatorServiceLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Calculating next billing date for startDate {StartDate}, billingCycle {BillingCycle}")]
	public static partial void CalculatingNextBillingDate(
		ILogger logger,
		LocalDate startDate,
		BillingCycle billingCycle);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Computing monthly spending")]
	public static partial void ComputingMonthlySpending(
		ILogger logger);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Computing upcoming renewals for daysAhead {DaysAhead}, today {Today}")]
	public static partial void ComputingUpcomingRenewals(
		ILogger logger,
		int daysAhead,
		LocalDate today);
}
