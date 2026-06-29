using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Utils;
using FluentValidation;
using NodaTime;

namespace BillingDesk.Subscription.Validators;

public sealed class CreateSubscriptionRequestValidator
	: AbstractValidator<CreateSubscriptionRequest>
{
	public CreateSubscriptionRequestValidator(IClock clock)
	{
		var today = clock.GetCurrentInstant()
						 .InUtc()
						 .Date;

		RuleFor(request => request.Name)
			.NotEmpty();

		RuleFor(request => request.Cost)
			.GreaterThan(0);

		RuleFor(request => request.Currency)
			.IsInEnum()
			.WithMessage("Currency must be one of the following values: USD, MWK, EUR.");

		RuleFor(request => request.BillingCycle)
			.IsInEnum()
			.WithMessage("BillingCycle must be one of the following values: Monthly, Yearly.");

		RuleFor(request => request.StartDate)
			.Must(startDate => startDate <= SubscriptionUtils.CalculateCutOffDate(today))
			.WithMessage("StartDate cannot be more than 1 year in the future.");
	}
}
