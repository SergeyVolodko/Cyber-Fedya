using System.Net;
using System.Web.Http;
using Newtonsoft.Json.Converters;
using SharpML.Recurrent.Networks;
using SharpML.Recurrent.Util;

namespace Cyber_Fedya_Api
{
    [RoutePrefix("fedya")]
    public class FedyaController: ApiController
    {
        private readonly NeuralNetwork network;

        public FedyaController()
        {
            //network = Binary.ReadFromBinary<NeuralNetwork>("test.z7");
        }

        [HttpGet]
        [Route("poehali")]
        public string Poehali(string primetext)
        {
            

            return "Djiga-djiga!";
        }
    }
}