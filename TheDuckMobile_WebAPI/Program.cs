using System.Text;
using TheDuckMobile_WebAPI.Config;
using TheDuckMobile_WebAPI.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using TheDuckMobile_WebAPI.Services;
using TheDuckMobile_WebAPI.Services.Impl;
using TheDuckMobile_WebAPI.Services.Admin;
using TheDuckMobile_WebAPI.Services.Impl.Admin;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("TheDuckMobile"))
    );
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["AppSettings:SecretKey"]
                    )
                ),
            ClockSkew = TimeSpan.Zero,
        };
    });


#region Dependency Injection
builder.Services.AddScoped<JwtProvider>();
builder.Services.AddScoped<ITwilioServices, TwilioServicesImpl>();
builder.Services.AddScoped<IUserServices, UserServicesImpl>();
builder.Services.AddScoped<IProductServices, ProductServicesImpl>();
builder.Services.AddScoped<IAddressServices, AddressServicesImpl>();
builder.Services.AddScoped<ICatalogServices, CatalogServicesImpl>();
builder.Services.AddScoped<ICloudinaryServices, CloudinaryServicesImpl>();
builder.Services.AddScoped<IJsonServices, JsonServicesImpl>();
builder.Services.AddScoped<IVoteServices, VoteServicesImpl>();

// Admin
builder.Services.AddScoped<IProductAdminServices, ProductAdminServicesImpl>();
builder.Services.AddScoped<ICustomerAdminServices, CustomerAdminServicesImpl>();
builder.Services.AddScoped<IStaffAdminServices, StaffAdminServicesImpl>();
builder.Services.AddScoped<IAddressAdminServices, AddressAdminServicesImpl>();
builder.Services.AddScoped<ICatalogAdminServices, CatalogAdminServicesImpl>();
builder.Services.AddScoped<IBrandAdminServices, BrandAdminServicesImpl>();
builder.Services.AddScoped<ISpecialFeatureAdminServices, SpecialFeatureAdminServicesImpl>();
builder.Services.AddScoped<IStoreAdminServices, StoreAdminServicesImpl>();
builder.Services.AddScoped<IOrderAdminServices, OrderAdminServicesImpl>();
builder.Services.AddScoped<ICouponAdminServices, CouponAdminServicesImpl>();
builder.Services.AddScoped<IFeedbackAdminServices, FeedbackAdminServicesImpl>();
builder.Services.AddScoped<ISpecialFeatureServices, SpecialFeatureServicesImpl>();
builder.Services.AddScoped<ICatalogAttributeServices, CatalogAttributeServicesImpl>();
builder.Services.AddScoped<IOSAdminServices, OSAdminServicesImpl>();
builder.Services.AddScoped<IColorAdminServices, ColorAdminServicesImpl>();
builder.Services.AddScoped<IProductVersionAdminServices, ProductVersionAdminServicesImpl>();
#endregion

var app = builder.Build();

app.UseExceptionHandler("/error-handler");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region CORS
app.UseCors(x => x
    .AllowAnyOrigin()
       .AllowAnyMethod()
          .AllowAnyHeader());
#endregion



//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
