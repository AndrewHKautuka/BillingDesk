using System;
using BillingDesk.Subscription.Types.Enums;
using Microsoft.EntityFrameworkCore.Migrations;
using NodaTime;

#nullable disable

namespace BillingDesk.Migrations
{
    /// <inheritdoc />
    public partial class AddSubscriptionModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "api");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:api.billing_cycle", "monthly,yearly")
                .Annotation("Npgsql:Enum:api.currency", "eur,mwk,usd")
                .Annotation("Npgsql:Enum:api.subscription_status", "active,inactive");

            migrationBuilder.CreateTable(
                name: "subscription",
                schema: "api",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    cost = table.Column<decimal>(type: "numeric", nullable: false),
                    currency = table.Column<Currency>(type: "api.currency", nullable: false),
                    billing_cycle = table.Column<BillingCycle>(type: "api.billing_cycle", nullable: false),
                    start_date = table.Column<LocalDate>(type: "date", nullable: false),
                    status = table.Column<SubscriptionStatus>(type: "api.subscription_status", nullable: false, defaultValue: SubscriptionStatus.Active),
                    category = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_subscription", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "subscription",
                schema: "api");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:Enum:api.billing_cycle", "monthly,yearly")
                .OldAnnotation("Npgsql:Enum:api.currency", "eur,mwk,usd")
                .OldAnnotation("Npgsql:Enum:api.subscription_status", "active,inactive");
        }
    }
}
