using BillingDesk.Subscription.Types.Queries;
using FluentValidation;

namespace BillingDesk.Subscription.Validators;

public sealed class UpcomingRenewalsQueryValidator
	: AbstractValidator<UpcomingRenewalsQuery>
{
	public UpcomingRenewalsQueryValidator()
	{
		RuleFor(query => query.Days)
			.GreaterThanOrEqualTo(0);
	}
}
