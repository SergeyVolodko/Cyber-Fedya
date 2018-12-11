using System.Collections.Generic;
using System.IO;

namespace Cyber_Fedya_Web.Domain
{
	public interface IJokeRepository
	{
		List<string> LoadAll();
		void Create(string joke);
	}

	public class JokeRepository : IJokeRepository
	{
		object theLock = new object();

		public List<string> LoadAll()
		{
			lock (theLock)
			{
				var path = Path.Combine("Data", "_stored_jokes.txt");
				var lines = File.ReadAllLines(path);
				return new List<string>(lines);
			}
		}

		public void Create(string joke)
		{
			lock (theLock)
			{
				var fileName = "_stored_jokes.txt";
				var newJokes = new List<string> { joke };

				File.AppendAllLines(Path.Combine("Data", fileName), newJokes);
			}
		}
	}
}