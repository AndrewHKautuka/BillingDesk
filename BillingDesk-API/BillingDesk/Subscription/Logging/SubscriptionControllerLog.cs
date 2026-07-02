using Microsoft.Extensions.Logging;

namespace BillingDesk.Subscription.Logging;

public static partial class SubscriptionControllerLog
{
	[LoggerMessage(Level = LogLevel.Debug, Message = "Creating subscription")]
	public static partial void CreatingSubscription(ILogger logger);

	[LoggerMessage(Level = LogLevel.Debug, Message = "Listing subscriptions")]
	public static partial void ListingSubscriptions(ILogger logger);

	[LoggerMessage(Level = LogLevel.Debug, Message = "Getting subscription with id {Id}")]
	public static partial void GettingSubscription(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Debug, Message = "Updating subscription with id {Id}")]
	public static partial void UpdatingSubscription(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Debug, Message = "Deleting subscription with id {Id}")]
	public static partial void DeletingSubscription(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Debug, Message = "Toggling subscription status for id {Id}")]
	public static partial void TogglingSubscriptionStatus(ILogger logger, Guid id);

	[LoggerMessage(Level = LogLevel.Warning, Message = "Validation failed in SubscriptionController")]
	public static partial void ValidationFailed(ILogger logger);

	[LoggerMessage(Level = LogLevel.Error, Message = "Unexpected error occurred in SubscriptionController")]
	public static partial void UnexpectedError(ILogger logger, Exception exception);
}
