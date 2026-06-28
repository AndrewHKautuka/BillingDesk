using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
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

		// Requests and Queries to Commands
		TypeAdapterConfig<CreateSubscriptionRequest, CreateSubscriptionCommand>
			.NewConfig();
		TypeAdapterConfig<SubscriptionQuery, ListSubscriptionsCommand>
			.NewConfig();

		// Commands to Models
		TypeAdapterConfig<CreateSubscriptionCommand, SubscriptionModel>
			.NewConfig();
		TypeAdapterConfig<UpdateSubscriptionCommand, SubscriptionModel>
			.NewConfig();

		// Models to Responses
		TypeAdapterConfig<SubscriptionModel, SubscriptionResponse>
			.NewConfig();

		TypeAdapterConfig.GlobalSettings.Compile();
	}
}
