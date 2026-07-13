using BillingDesk.Subscription.Types.Enums;
using Bogus;
using NodaTime;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Factories;

public sealed class SubscriptionFaker : Faker<SubscriptionModel>
{
	public const int Seed = 42;

	// Fixed anchor - all relative date arithmetic starts here so output is
	// fully deterministic and never depends on DateTime.Today.
	public static readonly LocalDate Anchor = new(2022, 1, 1);

	public SubscriptionFaker() : this(Seed) { }

	public SubscriptionFaker(int seed)
	{
		UseSeed(seed);

		RuleFor(s => s.Name,
				f => f.Company.CompanyName());

		RuleFor(s => s.Currency,
				f => f.PickRandom<Currency>());

		RuleFor(s => s.BillingCycle,
				f => f.PickRandom<BillingCycle>());

		RuleFor(s => s.Cost,
				(f, s) => RealisticCost(f, s.Currency, s.BillingCycle));

		RuleFor(s => s.StartDate,
				f =>
				{
					// Spread start dates between 3 years before and 1 year after the anchor
					var offset = f.Random.Int(-3 * 365, 365);
					return Anchor.PlusDays(offset);
				});

		RuleFor(s => s.Status,
				f => f.Random.WeightedRandom(
					[SubscriptionStatus.Active, SubscriptionStatus.Inactive],
					[0.8f, 0.2f]));

		RuleFor(s => s.Category,
				f => f.Commerce.Categories(1)[0]);
	}

	/// <summary>
	///     Builds a subscription whose next billing date relative to <see cref="Anchor" />
	///     falls exactly on <paramref name="renewalDate" />.
	/// </summary>
	public static SubscriptionModel WithFixedRenewalDate(
		LocalDate renewalDate,
		BillingCycle billingCycle,
		Faker f)
	{
		// Step back exactly one period from the target renewal date.
		// This guarantees that advancing by one period from startDate lands on renewalDate,
		// and since renewalDate > Anchor the start date will be < renewalDate (in the past
		// relative to that renewal date), satisfying the calculator's loop.
		var startDate = billingCycle == BillingCycle.Monthly
							? renewalDate.PlusMonths(-1)
							: renewalDate.PlusYears(-1);

		return new SubscriptionModel
			   {
				   Name = f.Company.CompanyName(),
				   Cost = RealisticCost(f, f.PickRandom<Currency>(), billingCycle),
				   Currency = f.PickRandom<Currency>(),
				   BillingCycle = billingCycle,
				   StartDate = startDate,
				   Status = SubscriptionStatus.Active,
				   Category = f.Commerce.Categories(1)[0]
			   };
	}

	/// <summary>
	///     Returns a cost that is plausible for the given currency and billing cycle.
	/// </summary>
	private static decimal RealisticCost(
		Faker f,
		Currency currency,
		BillingCycle cycle)
	{
		// Base monthly price ranges per currency (approximate real-world bands)
		var (min, max) = currency switch
		{
			Currency.USD => (2m, 50m),
			Currency.EUR => (2m, 50m),
			Currency.MWK => (500m, 8_000m),
			_ => (2m, 50m)
		};

		var monthly = Math.Round(f.Random.Decimal(min, max), 2);

		// Yearly plans typically offer ~15 % discount vs paying monthly × 12
		return cycle == BillingCycle.Yearly
				   ? Math.Round(monthly * 12m * 0.85m, 2)
				   : monthly;
	}
}
