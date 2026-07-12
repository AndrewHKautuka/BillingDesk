using BillingDesk.Common;
using BillingDesk.Common.Configs;
using BillingDesk.Common.OpenAPITransformers;
using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Http.Json;
using NodaTime;
using OpenApi.NodaTime.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var primaryConnectionString = builder.Configuration.GetConnectionString("Primary")!;

// Static configurations
MapsterConfig.ApplyMapsterConfig();
ValidatorOptionsConfig.ApplyValidatorOptionsConfig();

// Add services to the container.
// Singletons
builder.Services.AddSingleton<IClock>(SystemClock.Instance);

// Services
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
builder.Services.AddScoped<ISubscriptionCalculatorService, SubscriptionCalculatorService>();

// Services
builder.Services.AddScoped<IValidator<CreateSubscriptionRequest>, CreateSubscriptionRequestValidator>();
builder.Services.AddScoped<IValidator<UpdateSubscriptionRequest>, UpdateSubscriptionRequestValidator>();
builder.Services.AddScoped<IValidator<UpcomingRenewalsQuery>, UpcomingRenewalsQueryValidator>();

builder.Services.AddProblemDetails();

builder.Services.AddControllers(options =>
	   {
		   options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
	   })
	   .AddJsonOptions(options =>
	   {
		   options.JsonSerializerOptions.ConfigureJsonSerializerOptions();
	   });

builder.Services.Configure<JsonOptions>(options =>
{
	options.SerializerOptions.ConfigureJsonSerializerOptions();
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

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecksConfig("/health");

await app.RunAsync();
