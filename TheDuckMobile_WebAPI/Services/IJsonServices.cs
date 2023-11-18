using Newtonsoft.Json.Linq;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IJsonServices
    {
        public string SerializeObject(IDictionary<string, object> obj);
        public IDictionary<string, object> DeserializeObject(string json);
        public Task<IDictionary<string, object>> DeserializeObject(string json, ICollection<CatalogAttribute> attributes);
    }
}
