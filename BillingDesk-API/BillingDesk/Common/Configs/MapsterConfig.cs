using BillingDesk.Subscription.Types.Responses;
using Mapster;
using SubscriptionModel = BillingDesk.Subscription.Types.Models.Subscription;

namespace BillingDesk.Common.Configs;

public static class MapsterConfig
{
	private static bool _initialized;

	public static void ApplyMapsterConfig()
	{
		if (_initialized)
			return;

		_initialized = true;

		TypeAdapterConfig.GlobalSettings.RequireExplicitMapping = true;

		TypeAdapterConfig<SubscriptionModel, SubscriptionResponse>.NewConfig();

		TypeAdapterConfig.GlobalSettings.Compile();
	}
}
