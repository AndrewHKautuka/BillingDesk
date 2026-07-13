using System.Text.Json;
using FluentValidation;

namespace BillingDesk.Common.Configs;

public static class ValidatorOptionsConfig
{
	public static void ApplyValidatorOptionsConfig()
	{
		ValidatorOptions.Global.DisplayNameResolver = (_, member, _) =>
			member is not null
				? JsonNamingPolicy.CamelCase
								  .ConvertName(member.Name)
				: null;
	}
}
