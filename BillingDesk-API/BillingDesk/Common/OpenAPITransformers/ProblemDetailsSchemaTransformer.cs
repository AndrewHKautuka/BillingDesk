using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace BillingDesk.Common.OpenAPITransformers;

public sealed class ProblemDetailsSchemaTransformer : IOpenApiSchemaTransformer
{
	public Task TransformAsync(
		OpenApiSchema schema,
		OpenApiSchemaTransformerContext context,
		CancellationToken cancellationToken)
	{
		if (context.JsonTypeInfo.Type != typeof(ProblemDetails))
		{
			return Task.CompletedTask;
		}

		schema.Properties ??= new Dictionary<string, IOpenApiSchema>();
		schema.Properties["errors"] = new OpenApiSchema
									  {
										  Type = JsonSchemaType.Array,
										  Description = "Present on validation failures. " +
														"One entry per problem found " +
														"in the request.",
										  Items = new OpenApiSchema
												  {
													  Type = JsonSchemaType.Object,
													  Properties = new Dictionary<string, IOpenApiSchema>
																   {
																	   ["field"] = new OpenApiSchema
																				   {
																					   Type = JsonSchemaType.String,
																					   Description = "JSON Pointer " +
																									 "(RFC 6901) to the offending " +
																									 "field, or \"#\" for " +
																									 "whole-body problems."
																				   },
																	   ["message"] = new OpenApiSchema
																					 {
																						 Type = JsonSchemaType.String
																					 }
																   },
													  Required = new HashSet<string>
																 {
																	 "field",
																	 "message"
																 }
												  }
									  };

		schema.Example = new JsonObject
						 {
							 ["type"] = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
							 ["title"] = "One or more validation errors occurred.",
							 ["status"] = 400,
							 ["instance"] = "/api/subscriptions",
							 ["errors"] = new JsonArray
										  {
											  new JsonObject
											  {
												  ["field"] = "#/currency",
												  ["message"] = "Currency must be " +
																"one of: usd, mwk, eur."
											  }
										  }
						 };
		return Task.CompletedTask;
	}
}
