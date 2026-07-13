using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace BillingDesk.Common.OpenAPITransformers;

public sealed class ProblemDetailsOperationTransformer : IOpenApiOperationTransformer
{
	public async Task TransformAsync(
		OpenApiOperation operation,
		OpenApiOperationTransformerContext context,
		CancellationToken cancellationToken)
	{
		var schema = await context.GetOrCreateSchemaAsync(typeof(ProblemDetails),
														  cancellationToken: cancellationToken);

		operation.Responses ??= [];
		foreach (var (statusCode, response) in operation.Responses)
		{
			if (!int.TryParse(statusCode, out var code) || code < 400) continue;

			if (response is not OpenApiResponse openApiResponse)
				continue;

			openApiResponse.Content ??= new Dictionary<string, OpenApiMediaType>();
			openApiResponse.Content.Clear();
			openApiResponse.Content["application/problem+json"] = new OpenApiMediaType
																  {
																	  Schema = schema
																  };
		}
	}
}
