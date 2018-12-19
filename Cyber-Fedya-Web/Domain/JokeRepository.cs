using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace Cyber_Fedya_Web.Domain
{
	public interface IJokeRepository
	{
		List<string> LoadAllJokeTexts();
		void Create(string joke);
	}

	public class JokeRepository : IJokeRepository
	{
		private readonly string dataFolder;
		private readonly object theLock = new object();

		public JokeRepository(
			IApiConfiguration configuration)
		{
			dataFolder = configuration.DataFolder;
		}

		public List<string> LoadAllJokeTexts()
		{
			lock (theLock)
			{
				var path = Path.Combine(dataFolder, "_stored_jokes.json");
				var json = File.ReadAllText(path);
				var jokes = JsonConvert.DeserializeObject<List<Joke>>(json);

				return jokes.Select(j => j.Text).ToList();
			}
		}

		public void Create(string joke)
		{
			lock (theLock)
			{
				var path = Path.Combine(dataFolder, "_stored_jokes.json");

				var json = File.ReadAllText(path);
				var jokes = JsonConvert.DeserializeObject<List<Joke>>(json);

				jokes.Add(new Joke
				{
					Text = joke,
					Timestamp = DateTime.UtcNow
				});

				File.WriteAllText(path, JsonConvert.SerializeObject(jokes, Formatting.Indented));
			}
		}
	}
}