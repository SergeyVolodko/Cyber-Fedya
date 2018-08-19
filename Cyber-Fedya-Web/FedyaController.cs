using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Cyber_Fedya_Web.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Cyber_Fedya_Web
{
	[Route("api")]
	public class FedyaController : Controller
	{
		[HttpGet]
		[Route("vocabulary")]
		public WordsDto GetVocabulary()
		{
			return new WordsDto
			{
				Adjctives = new List<string>{"Кожанный", "Зелёный"},
				Names = new List<string>{"Олег", "Дмитрий Маликов"},
				Verbs = new List<string>{"Съел"},
				Nouns = new List<string> { "Ферзь" }
			};
		}

		//[HttpPost]
		//[Route("vocabulary")]
		//public HttpResponseMessage AddWord(NewWordDto dto)
		//{
		//	return new HttpResponseMessage(HttpStatusCode.BadRequest);
		//}

		//[HttpGet]
		//[Route("schemas")]
		//public IList<SchemaDto> GetSchemas()
		//{
		//	return new List<SchemaDto>();
		//}

		//[HttpPost]
		//[Route("schemas")]
		//public HttpResponseMessage CreateScheme(SchemaDto dto)
		//{
		//	return new HttpResponseMessage(HttpStatusCode.BadRequest);
		//}

		//[HttpPost]
		//[Route("sentenses")]
		//public HttpResponseMessage CreateScheme(string sentence)
		//{
		//	return new HttpResponseMessage(HttpStatusCode.BadRequest);
		//}
	}
}
