using System.Net.Http.Formatting;
using System.Web.Http;

namespace Cyber_Fedya_Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());

            config.EnsureInitialized();
        }
    }
}
