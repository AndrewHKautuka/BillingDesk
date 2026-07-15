using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Payment.Logging;

public static partial class ConfigurationFxRateProviderLog
{
	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Getting MWK exchange rate for currency {Currency}")]
	public static partial void GettingRateToMwk(
		ILogger logger,
		Currency currency);

	[LoggerMessage(Level = LogLevel.Debug,
				   Message = "Currency {Currency} is MWK - returning rate 1")]
	public static partial void CurrencyIsMwk(
		ILogger logger,
		Currency currency);

	[LoggerMessage(Level = LogLevel.Error,
				   Message = "No MWK exchange rate configured for currency {Currency}")]
	public static partial void RateNotConfigured(
		ILogger logger,
		Currency currency);
}
