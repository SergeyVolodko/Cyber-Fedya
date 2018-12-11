using System;
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
				joke = joke.Replace("\r\n", "").Replace(Environment.NewLine, "").Replace("\n", "");

				var path = Path.Combine("Data", "_stored_jokes.txt");

				File.AppendAllText(path, $"{Environment.NewLine}{joke}");
			}
		}
	}
}