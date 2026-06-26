using BillingDesk.Common.Constants;
using BillingDesk.Subscription.Types.Enums;
using Microsoft.EntityFrameworkCore;

namespace BillingDesk.Common;

public class BillingDeskDbContext(DbContextOptions<BillingDeskDbContext> options)
	: DbContext(options)
{
	public DbSet<Subscription.Types.Models.Subscription> Subscription { get; set; } = null!;

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(DbContextConstants.DatabaseSchema);

		base.OnModelCreating(modelBuilder);

		modelBuilder.Entity<Subscription.Types.Models.Subscription>()
					.Property(e => e.Status)
					.HasDefaultValue(SubscriptionStatus.Active);
	}
}
