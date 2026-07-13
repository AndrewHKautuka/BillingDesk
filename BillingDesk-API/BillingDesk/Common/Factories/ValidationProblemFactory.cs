using System.Text.Json;
using System.Text.RegularExpressions;
using BillingDesk.Common.Types.Responses;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BillingDesk.Common.Factories;

public static partial class ValidationProblemFactory
{
	[GeneratedRegex(@"missing required properties including:\s*(?<props>.+)\.$",
					RegexOptions.Compiled)]
	private static partial Regex MissingRequiredProperties();

	public static ProblemDetails FromFluentValidation(
		ValidationResult result,
		string instance)
	{
		var errors = result.Errors
						   .Select(e => new ValidationError(ToPointer(e.PropertyName),
															e.ErrorMessage));

		return Build(errors, instance);
	}

	public static ProblemDetails FromModelState(
		ModelStateDictionary modelState,
		string instance)
	{
		var errors = modelState
					 .Where(kvp => kvp.Value?
									  .Errors
									  .Count > 0)
					 .SelectMany(kvp => kvp.Value!
										   .Errors
										   .SelectMany(e => MapModelStateError(kvp.Key,
																			   e.ErrorMessage)));

		return Build(errors, instance);
	}

	private static IEnumerable<ValidationError> MapModelStateError(
		string key,
		string message)
	{
		if (key == "$")
		{
			var match = MissingRequiredProperties().Match(message);
			if (!match.Success)
			{
				// Malformed JSON
				yield return new ValidationError("#",
												 "The request body is not valid JSON.");
				yield break;
			}

			foreach (var raw in match.Groups["props"]
									 .Value
									 .Split(", "))
			{
				// Convert each missing property error into an appropriate validation error
				var property = JsonNamingPolicy.CamelCase
											   .ConvertName(raw.Trim('\'', ' '));

				yield return new ValidationError($"#/{property}",
												 $"'{property}' is required.");
			}

			yield break;
		}

		if (key.StartsWith("$.", StringComparison.Ordinal))
		{
			// Provide better message for cryptic invalid enum error message
			// (and other potential similar errors)
			var path = key[2..];
			var leaf = JsonNamingPolicy.CamelCase
									   .ConvertName(path.Split('.')[^1]);

			yield return new ValidationError(ToPointer(path),
											 $"The value provided for '{leaf}' is invalid.");
			yield break;
		}

		// Fall-through for other model state errors
		yield return new ValidationError(ToPointer(key),
										 message);
	}

	private static string ToPointer(string dottedPath)
	{
		return string.IsNullOrEmpty(dottedPath)
				   ? "#"
				   : "#/" + string.Join('/',
										dottedPath.Split('.')
												  .Select(JsonNamingPolicy.CamelCase
																		  .ConvertName));
	}

	private static ProblemDetails Build(
		IEnumerable<ValidationError> errors,
		string instance)
	{
		return new ProblemDetails
			   {
				   Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
				   Title = "One or more validation errors occurred.",
				   Status = StatusCodes.Status400BadRequest,
				   Instance = instance,
				   Extensions =
				   {
					   ["errors"] = errors.ToArray()
				   }
			   };
	}
}
