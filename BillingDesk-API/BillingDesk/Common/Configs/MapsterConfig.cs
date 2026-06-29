using BillingDesk.Subscription.Types.Commands;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Types.Responses;
using Mapster;
using NodaTime;
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
		TypeAdapterConfig<Guid, GetSubscriptionCommand>
			.NewConfig()
			.Map(dest => dest.Id,
				 src => src);
		TypeAdapterConfig<(Guid Id, UpdateSubscriptionRequest Request), UpdateSubscriptionCommand>
			.NewConfig()
			.Map(dest => dest,
				 src => src.Request)
			.Map(dest => dest.Id,
				 src => src.Id);
		TypeAdapterConfig<Guid, DeleteSubscriptionCommand>
			.NewConfig()
			.Map(dest => dest.Id,
				 src => src);
		TypeAdapterConfig<Guid, ToggleSubscriptionStatusCommand>
			.NewConfig()
			.Map(dest => dest.Id,
				 src => src);

		// Commands to Models
		TypeAdapterConfig<CreateSubscriptionCommand, SubscriptionModel>
			.NewConfig();
		TypeAdapterConfig<UpdateSubscriptionCommand, SubscriptionModel>
			.NewConfig();

		// Models to Responses
		TypeAdapterConfig<SubscriptionModel, SubscriptionResponse>
			.NewConfig();
		TypeAdapterConfig<(SubscriptionModel Subscription, LocalDate NextBillingDate), RenewalResponse>
			.NewConfig()
			.Map(dest => dest.Subscription,
				 src => src.Subscription)
			.Map(dest => dest.NextBillingDate,
				 src => src.NextBillingDate);

		// Others to Responses
		TypeAdapterConfig<LocalDate, BillingDateResponse>
			.NewConfig()
			.Map(dest => dest.NextBillingDate,
				 src => src);
		TypeAdapterConfig<decimal, MonthlyTotalResponse>
			.NewConfig()
			.Map(dest => dest.Total,
				 src => src);

		TypeAdapterConfig.GlobalSettings.Compile();
	}
}
