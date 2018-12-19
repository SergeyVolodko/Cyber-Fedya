using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace Cyber_Fedya_Web.Domain
{
	public interface ISchemeRepository
	{
		List<Scheme> LoadAll();

		void Create(Scheme scheme);

		void Update(string id, Scheme scheme);
	}

	public class SchemeRepository : ISchemeRepository
	{
		private readonly string dataFolder;
		private readonly object theLock = new object();

		public SchemeRepository(
			IApiConfiguration configuration)
		{
			dataFolder = configuration.DataFolder;
		}

		public List<Scheme> LoadAll()
		{
			lock (theLock)
			{
				var result = new List<Scheme>();

				var path = Path.Combine(dataFolder, "schemes");
				foreach (var file in Directory.EnumerateFiles(path))
				{
					var content = File.ReadAllText(file);
					result.Add(JsonConvert.DeserializeObject<Scheme>(content));
				}

				return result;
			}
		}

		public void Create(Scheme scheme)
		{
			lock (theLock)
			{
				var id = $"{removeSpecialCharacters(scheme.Name)}-{Guid.NewGuid()}";
				scheme.Id = id;

				var filePath = Path.Combine(dataFolder, "schemes", $"{id}.json");
				var content = JsonConvert.SerializeObject(scheme);

				File.WriteAllText(filePath, content);
			}
		}

		public void Update(string id, Scheme scheme)
		{
			lock (theLock)
			{
				var filePath = Path.Combine(dataFolder, "schemes", $"{id}.json");

				if (!File.Exists(filePath))
				{
					throw new ArgumentException($"Scheme not found: {id}");
				}

				var content = JsonConvert.SerializeObject(scheme);

				File.WriteAllText(filePath, content);
			}
		}

		private string removeSpecialCharacters(string text)
		{
			return string.Join("_", text.Split(Path.GetInvalidFileNameChars()));
		}
	}
}
