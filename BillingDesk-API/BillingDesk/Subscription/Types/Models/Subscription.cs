// ReSharper disable EntityFramework.ModelValidation.UnlimitedStringLength

using BillingDesk.Subscription.Types.Enums;
using NodaTime;

namespace BillingDesk.Subscription.Types.Models;

public class Subscription
{
	public Guid Id { get; init; }
	public required string Name { get; set; }
	public decimal Cost { get; set; }
	public Currency Currency { get; set; }
	public BillingCycle BillingCycle { get; set; }
	public LocalDate StartDate { get; set; }
	public SubscriptionStatus Status { get; set; }
	public required string Category { get; set; }
}
