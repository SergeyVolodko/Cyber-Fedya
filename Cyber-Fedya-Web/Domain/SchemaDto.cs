using System.Collections.Generic;

namespace Cyber_Fedya_Web.Domain
{
	public class SchemaDto
	{
		public string Name { get; set; }
		public IEnumerable<string> SentenceWords { get; set; }
	}
}
