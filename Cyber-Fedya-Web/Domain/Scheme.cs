using System.Collections.Generic;

namespace Cyber_Fedya_Web.Domain
{
	public class WordInScheme
	{
		public string Text { get; set; }
		public int OrderNumber { get; set; }
	}

	public class Scheme
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public IEnumerable<WordInScheme> Words { get; set; }
	}
}
