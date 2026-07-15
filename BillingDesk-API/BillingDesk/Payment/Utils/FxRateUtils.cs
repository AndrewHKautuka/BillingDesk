using BillingDesk.Payment.Services;
using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Payment.Utils;

public static class FxRateUtils
{
	public static decimal ConvertCostToMonthlyKwacha(
		IFxRateProvider rateProvider,
		BillingCycle billingCycle,
		Currency currency,
		decimal amount)
	{
		var rate = rateProvider.GetRateToMwk(currency);
		var costPerCycle = billingCycle == BillingCycle.Yearly
							   ? amount / 12m
							   : amount;
		return rate * costPerCycle;
	}
}
