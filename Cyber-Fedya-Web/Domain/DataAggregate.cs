using System.Collections.Generic;

namespace Cyber_Fedya_Web.Domain
{
	public class DataAggregate
	{
		public Vocabulary Vocabulary { get; set; }
		public List<Scheme> Schemas { get; set; }
		public List<string> Jokes { get; set; }
	}
}
