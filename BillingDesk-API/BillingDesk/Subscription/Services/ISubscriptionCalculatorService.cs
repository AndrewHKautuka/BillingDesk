using BillingDesk.Subscription.Types.Enums;
using BillingDesk.Subscription.Types.Results;
using NodaTime;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Services;

public interface ISubscriptionCalculatorService
{
	CalculateNextBillingDateResult CalculateNextBillingDate(
		LocalDate startDate,
		BillingCycle billingCycle,
		LocalDate referenceDate);

	GetMonthlySpendingResult GetMonthlySpending(
		IEnumerable<SubscriptionModel> subscriptions);

	GetUpcomingRenewalsResult GetUpcomingRenewals(
		IEnumerable<SubscriptionModel> subscriptions,
		int daysAhead,
		LocalDate today);
}
