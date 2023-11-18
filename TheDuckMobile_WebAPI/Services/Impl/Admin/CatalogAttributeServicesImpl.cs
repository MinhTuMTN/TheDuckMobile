using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class CatalogAttributeServicesImpl : ICatalogAttributeServices
    {
        private readonly DataContext _context;

        public CatalogAttributeServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<CatalogAttribute?> AddCatalogAttribute(CatalogAttributeRequest request)
        {
            var catalog = await _context
                .Catalogs
                .FirstOrDefaultAsync(c => c.CatalogId == request.CatalogId
                && c.IsDeleted == false);

            CatalogAttributeType type;
            Enum.TryParse(request.Type, out type);


            var catalogAttribute = new CatalogAttribute
            {
                Key = request.Key,
                DisplayName = request.DisplayName,
                Type = type,
                Catalog = catalog,
                IsRequired = request.IsRequired
            };

            foreach (var selectionValue in request.SelectionValues!)
            {
                catalogAttribute.SelectionValues!.Add(new SelectionValue
                {
                    Value = selectionValue,
                    IsDeleted = false
                });
            }

            await _context.CatalogAttributes.AddAsync(catalogAttribute);
            await _context.SaveChangesAsync();

            return catalogAttribute;
        }
    }
}
