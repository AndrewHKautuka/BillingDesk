using System.Text.Json;
using System.Text.Json.Serialization;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;

namespace BillingDesk.Common.Configs;

public static class JsonSerializerConfig
{
	public static void ConfigureJsonSerializerOptions(this JsonSerializerOptions options)
	{
		options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
		options.Converters
			   .Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
		options.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
		options.NumberHandling = JsonNumberHandling.Strict;
	}
}
