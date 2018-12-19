using System;
using System.Collections.Generic;
using System.IO;

namespace Cyber_Fedya_Web.Domain
{
	public interface IVocabularyRepository
	{
		void AddNewWord(NewWord word);
		Vocabulary Load();
	}

	public class VocabularyRepository : IVocabularyRepository
	{
		private readonly string dataFolder;
		private readonly object theLock = new object();

		public VocabularyRepository(
			IApiConfiguration configuration)
		{
			dataFolder = configuration.DataFolder;
		}

		public void AddNewWord(NewWord word)
		{
			lock (theLock)
			{
				var fileName = $"{word.Type}.txt";

				var path = Path.Combine(dataFolder, fileName);
				if (!File.Exists(path))
				{
					throw new Exception("Wrong word type!");
				}

				File.AppendAllText(path, $"{Environment.NewLine}{word.Word}");
			}
		}

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

		private SortedSet<string> readFromFile(string fileName)
		{
			var path = Path.Combine(dataFolder, fileName);
			var lines = File.ReadAllLines(path);
			return new SortedSet<string>(lines);
		}
	}
}
