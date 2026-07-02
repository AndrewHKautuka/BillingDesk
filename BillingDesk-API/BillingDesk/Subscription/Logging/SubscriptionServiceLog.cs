using Microsoft.Extensions.Logging;

namespace BillingDesk.Subscription.Logging;

public static partial class SubscriptionServiceLog
{
	[LoggerMessage(Level = LogLevel.Information, Message = "Subscription created with id {Id}")]
	public static partial void SubscriptionCreated(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Information, Message = "Subscription updated with id {Id}")]
	public static partial void SubscriptionUpdated(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Information, Message = "Subscription deleted with id {Id}")]
	public static partial void SubscriptionDeleted(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Information, Message = "Subscription status toggled for id {Id}")]
	public static partial void SubscriptionStatusToggled(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Warning, Message = "Subscription not found with id {Id}")]
	public static partial void SubscriptionNotFound(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Error, Message = "Unexpected error occurred in SubscriptionService")]
	public static partial void UnexpectedError(ILogger logger, Exception exception);
}
