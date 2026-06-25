using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace BillingDesk.Common.Configs;

public static class HealthChecksConfig
{
	public static void MapHealthChecksConfig(
		this IEndpointRouteBuilder endpoints,
		string healthEndpoint)
	{
		endpoints.MapHealthChecks(healthEndpoint,
								  new HealthCheckOptions
								  {
									  Predicate = _ => false
									  // no dependency checks, just "is the process up"
								  });

		endpoints.MapHealthChecks($"{healthEndpoint}/postgres",
								  new HealthCheckOptions
								  {
									  Predicate = check => check.Tags.Contains("postgres"),
									  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
								  });

		endpoints.MapHealthChecks($"{healthEndpoint}/ef",
								  new HealthCheckOptions
								  {
									  Predicate = check => check.Tags.Contains("ef"),
									  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
								  });

		endpoints.MapHealthChecks($"{healthEndpoint}/ready",
								  new HealthCheckOptions
								  {
									  Predicate = check => check.Tags.Contains("ready"),
									  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
								  });
	}
}
