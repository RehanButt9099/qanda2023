using DbUp;
using Microsoft.Extensions.Configuration;
using QandA.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using QandA.Authorization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
var connString = builder.Configuration.GetConnectionString("DefaultConnection");
EnsureDatabase.For.SqlDatabase(connString);

var upgrader = DeployChanges.To
    .SqlDatabase(connString, null)
    .WithScriptsEmbeddedInAssembly(
      System.Reflection.Assembly.GetExecutingAssembly()
    )
    .WithTransaction()
    .Build();
if (upgrader.IsUpgradeRequired())
{
    upgrader.PerformUpgrade();
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IDataRepository,DataRepository>();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IQuestionCache,QuestionCache>();
builder.Services.AddAuthentication(options =>
{
options.DefaultAuthenticateScheme =
  JwtBearerDefaults.AuthenticationScheme;
options.DefaultChallengeScheme =
  JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
  {
  options.Authority = builder.Configuration["Auth0:Authority"];
      options.Audience =
        builder.Configuration["Auth0:Audience"];
  });
builder.Services.AddHttpClient();
builder.Services.AddAuthorization(options =>
    options.AddPolicy("MustBeQuestionAuthor", policy
     =>
      policy.Requirements
      .Add(new MustBeQuestionAuthorRequirement())));
builder.Services.AddScoped<
    IAuthorizationHandler,
    MustBeQuestionAuthorHandler>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("http://localhost:3004")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

