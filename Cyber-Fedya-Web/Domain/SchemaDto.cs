using System.Collections.Generic;

namespace Cyber_Fedya_Web.Domain
{
	public class WordInScheme
	{
		public string Word { get; set; }
		public int OrderNumber { get; set; }
	}

	public class SchemaDto
	{
		public string Name { get; set; }
		public IEnumerable<WordInScheme> Words { get; set; }
	}
}
