using System.Net;
using System.Net.Http;
using Cyber_Fedya_Web.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cyber_Fedya_Web
{
	[Route("api")]
	public class FedyaController : Controller
	{
		private readonly IVocabularyRepository vocabularyRepository;
		private readonly ISchemeRepository schemeRepository;
		private readonly IJokeRepository jokeRepository;

		public FedyaController(
			IVocabularyRepository vocabularyRepository,
			ISchemeRepository schemeRepository,
			IJokeRepository jokeRepository)
		{
			this.vocabularyRepository = vocabularyRepository;
			this.schemeRepository = schemeRepository;
			this.jokeRepository = jokeRepository;
		}

		[HttpGet]
		[Authorize]
		[Route("everything")]
		public DataAggregate GetEverything()
		{
			return new DataAggregate
			{
				Vocabulary = vocabularyRepository.Load(),
				Schemas = schemeRepository.LoadAll(),
				Jokes = jokeRepository.LoadAll()
			};
		}

		[HttpPost]
		[Authorize]
		[Route("vocabulary")]
		public HttpResponseMessage AddWord(
			[FromBody]NewWord newWord)
		{
			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}

		[HttpPost]
		[Authorize]
		[Route("schemes")]
		public HttpResponseMessage CreateScheme(
			[FromBody]Scheme scheme)
		{
			schemeRepository.Create(scheme);
			return new HttpResponseMessage(HttpStatusCode.Created);
		}



		//[HttpPost]
		//[Route("sentenses")]
		//public HttpResponseMessage SaveSentence(string sentence)
		//{
		//	return new HttpResponseMessage(HttpStatusCode.BadRequest);
		//}
	}
}
