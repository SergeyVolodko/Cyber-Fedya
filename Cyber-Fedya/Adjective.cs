using System.Collections.Generic;

namespace Cyber_Fedya
{
    public class Adjective
    {
        public Dictionary<Gender, string> Form => new Dictionary<Gender, string>
        {
            { Gender.Masculine, string.Empty },
            { Gender.Feminine, string.Empty },
            { Gender.Neutral, string.Empty },
        };

        public string Plural;
    }
}
