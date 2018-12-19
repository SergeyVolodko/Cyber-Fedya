namespace Cyber_Fedya_Web
{
	public interface IApiConfiguration
	{
		string DataFolder { get; set; }
		string Auth0Domain { get; set; }
		string Auth0ClientId { get; set; }
	}

	public class ApiConfiguration : IApiConfiguration
	{
		public string DataFolder { get; set; }
		public string Auth0Domain { get; set; }
		public string Auth0ClientId { get; set; }
	}
}
