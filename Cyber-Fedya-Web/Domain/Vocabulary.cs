using System.Collections.Generic;

namespace Cyber_Fedya_Web.Domain
{
	public class Vocabulary
	{
		public SortedSet<string> Nouns { get; set; }
		public SortedSet<string> Verbs { get; set; }
		public SortedSet<string> Adjectives { get; set; }
		public SortedSet<string> Characters { get; set; }
		public SortedSet<string> Places { get; set; }
	}
}
