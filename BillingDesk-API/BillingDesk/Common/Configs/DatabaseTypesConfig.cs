using BillingDesk.Common.Constants;
using BillingDesk.Subscription.Types.Enums;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace BillingDesk.Common.Configs;

public static class DatabaseTypesConfig
{
	public static NpgsqlDbContextOptionsBuilder MapDatabaseEnums(this NpgsqlDbContextOptionsBuilder options)
	{
		return options.MapEnum<Currency>(schemaName: DbContextConstants.DatabaseSchema)
					  .MapEnum<BillingCycle>(schemaName: DbContextConstants.DatabaseSchema)
					  .MapEnum<SubscriptionStatus>(schemaName: DbContextConstants.DatabaseSchema);
	}
}
