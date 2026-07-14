using BillingDesk.Payment.Types.Configs;
using BillingDesk.Subscription.Types.Enums;
using Microsoft.Extensions.Options;

namespace BillingDesk.Payment.Services;

public sealed class ConfigurationFxRateProvider(IOptions<FxRatesConfig> options) : IFxRateProvider
{
	private readonly FxRatesConfig _config = options.Value;

	/// <inheritdoc />
	public decimal GetRateToMwk(Currency from)
	{
		if (from is Currency.MWK)
		{
			return 1m;
		}

		if (!_config.RatesToMwk.TryGetValue(from, out var rate))
		{
			throw new InvalidOperationException(
				$"No MWK exchange rate configured for currency '{from}'. " +
				$"Add an entry under '{FxRatesConfig.SectionName}:RatesToMWK:{from}' in app.settings.");
		}

		return rate;
	}
}
