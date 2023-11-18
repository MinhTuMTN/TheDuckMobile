using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class JsonServicesImpl : IJsonServices
    {
        public IDictionary<string, object> DeserializeObject(string json)
        {
            IDictionary<string, object>? result = JsonConvert
                .DeserializeObject<Dictionary<string, object>>(json);

            if (result is null)
                throw new BadHttpRequestException("Invalid JSON");

            return result;
        }

        public IDictionary<string, object> DeserializeObject(string json, ICollection<CatalogAttribute> attributes)
        {
            IDictionary<string, object>? jsonDictionary = JsonConvert
                .DeserializeObject<Dictionary<string, object>>(json);

            IDictionary<string, object>? result = new Dictionary<string, object>();

            if (jsonDictionary is null)
                throw new BadHttpRequestException("Invalid JSON");


            foreach (CatalogAttribute attribute in attributes)
            {
                if (attribute.IsRequired && !jsonDictionary.ContainsKey(attribute.Key!))
                    throw new BadHttpRequestException(
                        $"Invalid JSON. Missing key: {attribute.Key}"
                    );

                if (jsonDictionary.ContainsKey(attribute.Key!))
                    result.Add(attribute.Key!, jsonDictionary[attribute.Key!]);
            }
            return result;
        }

        public string SerializeObject(IDictionary<string, object> obj)
        {
            try
            {
                return JsonConvert.SerializeObject(obj);
            }
            catch
            {
                throw new BadHttpRequestException("Invalid JSON");
            }
        }
    }
}
