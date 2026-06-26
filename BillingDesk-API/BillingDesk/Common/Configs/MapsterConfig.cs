using Mapster;

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

		// Add Mappings here

		TypeAdapterConfig.GlobalSettings.Compile();
	}
}
