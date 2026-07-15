using BillingDesk.Common;
using BillingDesk.Common.Configs;
using BillingDesk.Common.Factories;
using BillingDesk.Common.OpenAPITransformers;
using BillingDesk.Payment.Services;
using BillingDesk.Payment.Types.Configs;
using BillingDesk.Subscription.Seeders;
using BillingDesk.Subscription.Services;
using BillingDesk.Subscription.Types.Queries;
using BillingDesk.Subscription.Types.Requests;
using BillingDesk.Subscription.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NodaTime;
using OneKhusa.SDK.Extensions;
using OpenApi.NodaTime.Extensions;
using Scalar.AspNetCore;
using JsonOptions = Microsoft.AspNetCore.Http.Json.JsonOptions;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var primaryConnectionString = configuration.GetConnectionString("Primary")!;
var oneKhusaConfig = configuration.GetSection(OneKhusaConfig.SectionName)
								  .Get<OneKhusaConfig>()!;

// Static configurations
MapsterConfig.ApplyMapsterConfig();
ValidatorOptionsConfig.ApplyValidatorOptionsConfig();

// Add services to the container.
// Singletons
builder.Services.AddSingleton<IClock>(SystemClock.Instance);
builder.Services.AddSingleton<IFxRateProvider, ConfigurationFxRateProvider>();
builder.Services.AddSingleton(new OneKhusaMerchantEmail(oneKhusaConfig.MerchantEmail));

// Services
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
builder.Services.AddScoped<ISubscriptionCalculatorService, SubscriptionCalculatorService>();
builder.Services.AddScoped<IPaymentService, OneKhusaPaymentService>();

// Seeders
builder.Services.AddScoped<SubscriptionSeeder>();

// Validators
builder.Services.AddScoped<IValidator<CreateSubscriptionRequest>, CreateSubscriptionRequestValidator>();
builder.Services.AddScoped<IValidator<UpdateSubscriptionRequest>, UpdateSubscriptionRequestValidator>();
builder.Services.AddScoped<IValidator<UpcomingRenewalsQuery>, UpcomingRenewalsQueryValidator>();

builder.Services.AddCors(options =>
{
	var frontendUrl = configuration.GetValue<string>("FrontendUrl")!;
	options.AddDefaultPolicy(policy =>
	{
		policy.WithOrigins(frontendUrl).AllowAnyMethod().AllowAnyHeader();
	});
});

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
								options.AddOperationTransformer<ProblemDetailsOperationTransformer>();
								options.AddSchemaTransformer<ProblemDetailsSchemaTransformer>();
							});

builder.Services.AddDbContext<BillingDeskDbContext>(options =>
{
	options.UseConfiguredDbContext(primaryConnectionString);
});

builder.Services.AddOneKhusaClient(options =>
{
	options.IsSandbox = oneKhusaConfig.IsSandbox;
	options.ApiKey = oneKhusaConfig.ApiKey;
	options.ApiSecret = oneKhusaConfig.ApiSecret;
	options.OrganisationId = oneKhusaConfig.OrganisationId;
	options.MerchantAccountNumber = oneKhusaConfig.MerchantAccountNumber;
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
	options.InvalidModelStateResponseFactory = context =>
		new ObjectResult(ValidationProblemFactory.FromModelState(context.ModelState,
																 context.HttpContext.Request.Path))
		{
			StatusCode = StatusCodes.Status400BadRequest,
			ContentTypes =
			{
				"application/problem+json"
			}
		};
});

builder.Services.Configure<FxRatesConfig>(configuration.GetSection(FxRatesConfig.SectionName));

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

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecksConfig("/health");

using (var scope = app.Services.CreateScope())
{
	await scope.ServiceProvider.GetRequiredService<SubscriptionSeeder>().SeedAsync();
}

await app.RunAsync();
