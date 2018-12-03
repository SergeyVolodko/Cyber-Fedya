using System.Collections.Generic;
using System.IO;

namespace Cyber_Fedya_Web.Domain
{
	public interface IVocabularyRepository
	{
		Vocabulary Load();
	}

	public class VocabularyRepository : IVocabularyRepository
	{
		object theLock = new object();

		public Vocabulary Load()
		{
			lock (theLock)
			{
				var nouns = readFromFile("nouns.txt");
				var adjectives = readFromFile("adjectives.txt");
				var verbs = readFromFile("verbs.txt");
				var places = readFromFile("places.txt");
				var characters = readFromFile("characters.txt");

				return new Vocabulary
				{
					Nouns = nouns,
					Adjectives = adjectives,
					Characters = characters,
					Places = places,
					Verbs = verbs
				};
			}
		}

		private List<string> readFromFile(string fileName)
		{
			var path = Path.Combine("Data", fileName);
			var lines = File.ReadAllLines(path);
			return new List<string>(lines);
		}
	}
}
