using System;
using Cyber_Fedya_Web.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;

namespace Cyber_Fedya_Web
{
	public class Startup
	{
		public IApiConfiguration apiConfiguration { get; }

		public Startup(IHostingEnvironment env)
		{
			var configBuilder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();

			this.apiConfiguration = new ApiConfiguration();

			var configurationRoot = configBuilder.Build();
			configurationRoot.GetSection("ApiConfiguration").Bind(apiConfiguration);
		}

		public IServiceProvider ConfigureServices(IServiceCollection services)
		{
			services.AddMemoryCache();
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			services.AddTransient<IVocabularyRepository, VocabularyRepository>();
			services.AddTransient<ISchemeRepository, SchemeRepository>();
			services.AddTransient<IJokeRepository, JokeRepository>();
			services.AddSingleton(this.apiConfiguration);

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.Authority = this.apiConfiguration.Auth0Domain;
				options.Audience = this.apiConfiguration.Auth0ClientId;
			});
			services.AddReact();
			services.AddMvc();

			return services.BuildServiceProvider();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			// Initialise ReactJS.NET. Must be before static files.
			app.UseReact(config =>
			{
				// If you use an external build too (for example, Babel, Webpack,
				// Browserify or Gulp), you can improve performance by disabling
				// ReactJS.NET's version of Babel and loading the pre-transpiled
				// scripts. Example:
				//config
				//  .SetLoadBabel(false)
				//  .AddScriptWithoutTransform("~/Scripts/bundle.server.js");
			});

			app.UseDefaultFiles();
			app.UseStaticFiles();
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
