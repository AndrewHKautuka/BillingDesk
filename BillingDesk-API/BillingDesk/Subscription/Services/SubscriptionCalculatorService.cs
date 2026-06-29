using BillingDesk.Subscription.Logging;
using BillingDesk.Subscription.Types.Enums;
using BillingDesk.Subscription.Types.Responses;
using BillingDesk.Subscription.Types.Results;
using Mapster;
using NodaTime;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Services;

public sealed class SubscriptionCalculatorService(ILogger<SubscriptionCalculatorService> logger)
	: ISubscriptionCalculatorService
{
	public CalculateNextBillingDateResult CalculateNextBillingDate(
		LocalDate startDate,
		BillingCycle billingCycle,
		LocalDate referenceDate)
	{
		SubscriptionCalculatorServiceLog.CalculatingNextBillingDate(logger,
																	startDate,
																	billingCycle);

		if (startDate > referenceDate)
		{
			return new CalculateNextBillingDateResult.Success(new BillingDateResponse(startDate));
		}

		var period = billingCycle switch
		{
			BillingCycle.Monthly => Period.FromMonths(1),
			BillingCycle.Yearly => Period.FromYears(1),
			_ => throw new ArgumentOutOfRangeException(nameof(billingCycle),
													   billingCycle,
													   $"Illegal billing cycle: {billingCycle}")
		};

		var nextBillingDate = startDate;
		while (nextBillingDate <= referenceDate)
		{
			nextBillingDate += period;
		}

		return new CalculateNextBillingDateResult.Success(new BillingDateResponse(nextBillingDate));
	}

	public GetMonthlySpendingResult GetMonthlySpending(
		IEnumerable<SubscriptionModel> subscriptions)
	{
		SubscriptionCalculatorServiceLog.ComputingMonthlySpending(logger);

		var total = subscriptions
					.Where(s => s.Status == SubscriptionStatus.Active)
					.Sum(s => s.BillingCycle == BillingCycle.Yearly
								  ? s.Cost / 12m
								  : s.Cost);

		return new GetMonthlySpendingResult.Success(new MonthlyTotalResponse(total));
	}

	public GetUpcomingRenewalsResult GetUpcomingRenewals(
		IEnumerable<SubscriptionModel> subscriptions,
		int daysAhead,
		LocalDate today)
	{
		SubscriptionCalculatorServiceLog.ComputingUpcomingRenewals(logger,
																   daysAhead,
																   today);

		if (daysAhead < 0)
		{
			return new GetUpcomingRenewalsResult.NegativeDaysAhead();
		}

		// Use yesterday as reference so that subscriptions due today are included
		var referenceDate = today - Period.FromDays(1);
		var windowEnd = today + Period.FromDays(daysAhead - 1);

		var renewals = subscriptions
					   .Where(e => e.Status == SubscriptionStatus.Active)
					   .Select(e =>
					   {
						   var result = CalculateNextBillingDate(e.StartDate,
																 e.BillingCycle,
																 referenceDate);

						   return result switch
						   {
							   CalculateNextBillingDateResult.Success r => (Subscription: e,
																			BillingDateResponse: r.Response),
							   _ => throw new ArgumentException(
										$"Illegal result type: {result}")
						   };
					   })
					   .Where(e => e.BillingDateResponse.NextBillingDate >= today
								   && e.BillingDateResponse.NextBillingDate <= windowEnd)
					   .Select(e => new RenewalResponse(e.Subscription.Adapt<SubscriptionResponse>(),
														e.BillingDateResponse))
					   .ToList();

		return new GetUpcomingRenewalsResult.Success(renewals);
	}
}
