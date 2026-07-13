using BillingDesk.Common;
using BillingDesk.Subscription.Factories;
using BillingDesk.Subscription.Types.Enums;
using Bogus;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Subscription.Seeders;

/// <summary>
///     Seeds <see cref="BillingDeskDbContext" /> with a deterministic set of subscriptions.
///     Register as a scoped service and call <see cref="SeedAsync" /> at startup.
///     Only runs when the table is empty (idempotent).
/// </summary>
public sealed class SubscriptionSeeder(BillingDeskDbContext db)
{
	public async Task SeedAsync()
	{
		if (await db.Subscription.AnyAsync())
		{
			return;
		}

		var subscriptions = BuildSubscriptions();
		await db.Subscription
				.AddRangeAsync(subscriptions);
		await db.SaveChangesAsync();
	}

	private static List<SubscriptionModel> BuildSubscriptions()
	{
		var anchor = SubscriptionFaker.Anchor; // Fixed
		var faker = new SubscriptionFaker();

		// Shared plain Faker for helpers that need random data outside of Faker<T>
		var f = new Faker
				{
					Random = new Randomizer(SubscriptionFaker.Seed)
				};

		var all = new List<SubscriptionModel>();

		// Base random batch

		all.AddRange(faker.Generate(20));

		// Shared-renewal groups

		// Group A - 4 monthly subscriptions renewing on the same date
		var groupA = anchor.PlusDays(45);
		for (var i = 0; i < 4; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(groupA,
														   BillingCycle.Monthly,
														   f));
		}

		// Group B - 3 yearly subscriptions renewing on the same date
		var groupB = anchor.PlusDays(90);
		for (var i = 0; i < 3; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(groupB,
														   BillingCycle.Yearly,
														   f));
		}

		// Group C - 3 monthly subscriptions renewing on the same date
		var groupC = anchor.PlusDays(200);
		for (var i = 0; i < 3; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(groupC,
														   BillingCycle.Monthly,
														   f));
		}

		// Pair 1 - monthly
		var pair1 = anchor.PlusDays(130);
		for (var i = 0; i < 2; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(pair1,
														   BillingCycle.Monthly,
														   f));
		}

		// Pair 2 - yearly
		var pair2 = anchor.PlusDays(270);
		for (var i = 0; i < 2; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(pair2,
														   BillingCycle.Yearly,
														   f));
		}

		// Pair 3 - monthly
		var pair3 = anchor.PlusDays(160);
		for (var i = 0; i < 2; i++)
		{
			all.Add(SubscriptionFaker.WithFixedRenewalDate(pair3,
														   BillingCycle.Monthly,
														   f));
		}

		// Always-imminent subscriptions

		// "Imminent" means renewing within 2 days of the query date.
		// Because the billing calculator advances by calendar months, a monthly
		// subscription started on day D of any month will always renew on day D
		// every subsequent month - permanently.
		//
		// Strategy: seed 4 monthly subscriptions for each day-of-month 1-28
		// (28 is the lowest common denominator across all months). On any given
		// date, at least 3 of those day buckets fall within the 2-day window,
		// so there are always >= 12 imminent renewals regardless of the query date.
		//
		// Start dates are placed 1-4 months before the first occurrence of each
		// day-of-month on or after the anchor, so the fixed-anchor billing math
		// is consistent and independent of DateTime.Today.

		var imminentFaker = new SubscriptionFaker(SubscriptionFaker.Seed + 1);

		for (var day = 1; day <= 28; day++)
		{
			// First occurrence of this day-of-month at or after the anchor
			var firstRenewal = new LocalDate(anchor.Year, anchor.Month, day);
			if (firstRenewal < anchor)
				firstRenewal = firstRenewal.PlusMonths(1);

			for (var copy = 0; copy < 4; copy++)
			{
				// Each copy starts one more month before firstRenewal so they all
				// share the same renewal cadence but have distinct start dates
				var startDate = firstRenewal.PlusMonths(-(copy + 1));

				var sub = imminentFaker.Generate();
				sub.StartDate = startDate;
				sub.BillingCycle = BillingCycle.Monthly;
				sub.Status = SubscriptionStatus.Active;
				all.Add(sub);
			}
		}

		// Top-up to guarantee >= 100 total
		if (all.Count < 100)
		{
			all.AddRange(faker.Generate(100 - all.Count));
		}

		return all;
	}
}
