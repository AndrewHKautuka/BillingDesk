namespace BillingDesk.Payment.Types.Requests;

public sealed class SimulateAcceptRequestToPayRequest
{
	public required string TimedAccountNumber { get; init; }
	public required decimal TransactionAmount { get; init; }
	public required int ConnectorId { get; init; }
}
