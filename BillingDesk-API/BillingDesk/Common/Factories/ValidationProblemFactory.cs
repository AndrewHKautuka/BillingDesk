using System.Text.Json;
using BillingDesk.Common.Types.Responses;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace BillingDesk.Common.Factories;

public static class ValidationProblemFactory
{
	public static ProblemDetails FromFluentValidation(
		ValidationResult result,
		string instance)
	{
		var errors = result.Errors
						   .Select(e => new ValidationError(ToPointer(e.PropertyName),
															e.ErrorMessage));
		return Build(errors, instance);
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
