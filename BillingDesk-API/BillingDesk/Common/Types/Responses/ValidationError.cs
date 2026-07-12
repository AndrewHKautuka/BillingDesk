namespace BillingDesk.Common.Types.Errors;

public sealed record ValidationError(string Field, string Message);
