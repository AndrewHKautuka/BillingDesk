using BillingDesk.Common.Constants;
using BillingDesk.Subscription.Types.Enums;
using Microsoft.EntityFrameworkCore;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Common;

public class BillingDeskDbContext(DbContextOptions<BillingDeskDbContext> options)
	: DbContext(options)
{
	public DbSet<SubscriptionModel> Subscription { get; set; } = null!;

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(DbContextConstants.DatabaseSchema);

		base.OnModelCreating(modelBuilder);

		modelBuilder.Entity<SubscriptionModel>()
					.Property(e => e.Status)
					.HasDefaultValue(SubscriptionStatus.Active);
	}
}
