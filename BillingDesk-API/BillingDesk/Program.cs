using BillingDesk.Common;
using BillingDesk.Common.Configs;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;
using OpenApi.NodaTime.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var primaryConnectionString = builder.Configuration.GetConnectionString("Primary")!;

// Add services to the container.
// Singletons
builder.Services.AddSingleton<IClock>(SystemClock.Instance);

builder.Services.AddControllers()
	   .AddJsonOptions(options =>
	   {
		   options.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
	   });

builder.Services.AddHealthChecks()
	   .AddNpgSql(primaryConnectionString,
				  name: "postgresql",
				  tags: ["db", "postgres", "ready"])
	   .AddDbContextCheck<BillingDeskDbContext>("dbcontext",
												tags: ["db", "ef", "ready"]);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi("v1",
							options =>
							{
								options.ConfigureNodaTime();
							});

builder.Services.AddDbContext<BillingDeskDbContext>(options =>
{
	options.UseConfiguredDbContext(primaryConnectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
	app.MapScalarApiReference(options =>
	{
		options.Title = "Billing Desk API - Scalar";
	});
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/openapi/v1.json", "v1");
		options.DocumentTitle = "Billing Desk API - Swagger UI";
	});
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecksConfig("/health");

await app.RunAsync();
