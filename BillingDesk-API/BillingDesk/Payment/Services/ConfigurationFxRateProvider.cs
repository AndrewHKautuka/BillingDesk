using BillingDesk.Payment.Logging;
using BillingDesk.Payment.Types.Configs;
using BillingDesk.Subscription.Types.Enums;
using Microsoft.Extensions.Options;

namespace BillingDesk.Payment.Services;

public sealed class ConfigurationFxRateProvider(
	IOptions<FxRatesConfig> options,
	ILogger<ConfigurationFxRateProvider> logger) : IFxRateProvider
{
	private readonly FxRatesConfig _config = options.Value;

	/// <inheritdoc />
	public decimal GetRateToMwk(Currency from)
	{
		ConfigurationFxRateProviderLog.GettingRateToMwk(logger, from);

		if (from is Currency.MWK)
		{
			ConfigurationFxRateProviderLog.CurrencyIsMwk(logger, from);
			return 1m;
		}

		if (!_config.RatesToMwk.TryGetValue(from, out var rate))
		{
			ConfigurationFxRateProviderLog.RateNotConfigured(logger, from);
			throw new InvalidOperationException(
				$"No MWK exchange rate configured for currency '{from}'. " +
				$"Add an entry under '{FxRatesConfig.SectionName}:RatesToMWK:{from}' in app.settings.");
		}

		return rate;
	}
}
