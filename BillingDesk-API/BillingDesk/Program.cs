using System.Text.Json;
using System.Text.Json.Serialization;
using BillingDesk.Common;
using BillingDesk.Common.Configs;
using BillingDesk.Common.OpenAPITransformers;
using BillingDesk.Subscription.Services;
using Microsoft.AspNetCore.Http.Json;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;
using OpenApi.NodaTime.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var primaryConnectionString = builder.Configuration.GetConnectionString("Primary")!;

// Static configurations
MapsterConfig.ApplyMapsterConfig();

// Add services to the container.
// Singletons
builder.Services.AddSingleton<IClock>(SystemClock.Instance);

// Services
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();

builder.Services.AddControllers()
	   .AddJsonOptions(options =>
	   {
		   options.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
	   });

builder.Services.Configure<JsonOptions>(options =>
{
	options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
	options.SerializerOptions
		   .Converters
		   .Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
	options.SerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
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
								options.AddOperationTransformer<QueryParameterOperationTransformer>();
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
