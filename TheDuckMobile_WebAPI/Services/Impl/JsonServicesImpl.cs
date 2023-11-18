using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class JsonServicesImpl : IJsonServices
    {
        private readonly DataContext _context;

        public JsonServicesImpl(DataContext context)
        {
            _context = context;
        }

        public IDictionary<string, object> DeserializeObject(string json)
        {
            IDictionary<string, object>? result = JsonConvert
                .DeserializeObject<Dictionary<string, object>>(json);

            if (result is null)
                throw new BadHttpRequestException("Invalid JSON");

            return result;
        }

        public async Task<IDictionary<string, object>> DeserializeObject(string json, ICollection<CatalogAttribute> attributes)
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

                if (!jsonDictionary.ContainsKey(attribute.Key!))
                    continue;

                if (attribute.Type == CatalogAttributeType.Boolean)
                {
                    if (jsonDictionary[attribute.Key!] is bool)
                        result.Add(attribute.Key!, jsonDictionary[attribute.Key!]);
                    else
                        throw new BadHttpRequestException(
                            $"Invalid JSON. Key: {attribute.Key} must be a boolean"
                        );
                }
                else if (attribute.Type == CatalogAttributeType.Selection)
                {
                    var selectionValues = await _context
                        .SelectionValues
                        .Where(s => s.CatalogAttribute != null
                            && s.CatalogAttribute.Key == attribute.Key
                        )
                        .Select(s => s.Value)
                        .ToListAsync();

                    if (selectionValues.Contains(jsonDictionary[attribute.Key!]))
                        result.Add(attribute.Key!, jsonDictionary[attribute.Key!]);
                    else
                        throw new BadHttpRequestException(
                            $"Invalid JSON. Key: {attribute.Key} must be one of the following: " +
                            $"{string.Join(", ", selectionValues)}"
                        );
                }
                else if (attribute.Type == CatalogAttributeType.Normal)
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
