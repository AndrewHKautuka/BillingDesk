using BillingDesk.Subscription.Constants;
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
			.WithMessage(SubscriptionConstants.InvalidCurrencyMessage);

		RuleFor(request => request.BillingCycle)
			.IsInEnum()
			.WithMessage(SubscriptionConstants.InvalidBillingCycleMessage);

		RuleFor(request => request.StartDate)
			.Must(startDate => startDate <= SubscriptionUtils.CalculateCutOffDate(today))
			.WithMessage(SubscriptionConstants.InvalidStartDateMessage);
	}
}
