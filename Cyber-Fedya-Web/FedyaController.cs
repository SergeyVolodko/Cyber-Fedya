using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;

namespace Cyber_Fedya_Api
{
    [Route("poehali")]
    public class FedyaController: Controller
    {
        
        [HttpGet("{primetext}")]
        public string Poehali(string primetext)
        {
            return "Djiga-djiga!";
        }
    }
}