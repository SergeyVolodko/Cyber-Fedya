using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SharpML.Recurrent.Networks;
using SharpML.Recurrent.Util;

namespace Cyber_Fedya_Api
{
    public class FedyaController : ApiController
    {
        private readonly NeuralNetwork network;

        public FedyaController()
        {
            //network = Binary.ReadFromBinary<NeuralNetwork>("test.z7");
            
        }

        [HttpGet]
        [Route("generate")]
        public string GenerateJoke(string primetext)
        {
            return "Vorobei";
        }

        
    }
}