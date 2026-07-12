namespace BillingDesk.Common.Types.Responses;

public sealed record ValidationError(string Field, string Message);
