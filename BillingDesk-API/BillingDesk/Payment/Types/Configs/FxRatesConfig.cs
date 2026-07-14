using BillingDesk.Subscription.Types.Enums;

namespace BillingDesk.Payment.Types.Configs;

public sealed record FxRatesConfig
{
	public const string SectionName = "FxRates";

	/// <summary>
	///     Exchange rates expressed as "how many MWK does 1 unit of this currency buy".
	///     MWK itself is omitted - its rate is always 1 by definition.
	/// </summary>
	// ReSharper disable once UnusedAutoPropertyAccessor.Global
	public required IReadOnlyDictionary<Currency, decimal> RatesToMwk { get; init; }
}
