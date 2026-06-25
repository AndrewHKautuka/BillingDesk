using BillingDesk.Common.Constants;
using Microsoft.EntityFrameworkCore;

namespace BillingDesk.Common;

public class BillingDeskDbContext(DbContextOptions<BillingDeskDbContext> options)
	: DbContext(options)
{
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(DbContextConstants.DatabaseSchema);
		base.OnModelCreating(modelBuilder);
	}
}
