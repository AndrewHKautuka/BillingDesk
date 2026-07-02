using System.Text.Json;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace BillingDesk.Common.OpenAPITransformers;

public sealed class QueryParameterOperationTransformer : IOpenApiOperationTransformer
{
	public Task TransformAsync(
		OpenApiOperation operation,
		OpenApiOperationTransformerContext context,
		CancellationToken cancellationToken)
	{
		if (operation.Parameters == null)
		{
			return Task.CompletedTask;
		}

		foreach (var parameterInterface in operation.Parameters)
		{
			if (parameterInterface is not OpenApiParameter { In: ParameterLocation.Query } parameter)
				continue;

			var originalName = parameter.Name ?? string.Empty;
			parameter.Name = JsonNamingPolicy.CamelCase.ConvertName(originalName);
		}

		return Task.CompletedTask;
	}
}
