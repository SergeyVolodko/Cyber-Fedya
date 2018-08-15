using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Cyber_Fedya_Web.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Cyber_Fedya_Web
{
	[Route("fedya")]
	public class FedyaController : Controller
	{
		[HttpGet]
		[Route("words")]
		public WordsDto GetWords()
		{
			return new WordsDto();
		}

		[HttpPost]
		[Route("words")]
		public HttpResponseMessage AddWord(NewWordDto dto)
		{
			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}

		[HttpGet]
		[Route("schemas")]
		public IList<SchemaDto> GetSchemas()
		{
			return new List<SchemaDto>();
		}

		[HttpPost]
		[Route("words")]
		public HttpResponseMessage CreateScheme(SchemaDto dto)
		{
			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}

		[HttpPost]
		[Route("sentenses")]
		public HttpResponseMessage CreateScheme(string sentence)
		{
			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}
	}
}
