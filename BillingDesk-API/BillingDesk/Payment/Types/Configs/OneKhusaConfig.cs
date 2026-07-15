using System.ComponentModel.DataAnnotations;

namespace BillingDesk.Payment.Types.Configs;

public sealed record OneKhusaConfig
{
	public const string SectionName = "OneKhusa";
	public required bool IsSandbox { get; set; }
	public required string ApiKey { get; set; }
	public required string ApiSecret { get; set; }
	public required string OrganisationId { get; set; }
	public required int MerchantAccountNumber { get; set; }

	[EmailAddress]
	public required string MerchantEmail { get; set; }
}
