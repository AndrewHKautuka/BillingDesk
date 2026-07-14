using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Payment.Services;

public interface IFxRateProvider
{
	decimal GetRateToMwk(Currency from);
}
