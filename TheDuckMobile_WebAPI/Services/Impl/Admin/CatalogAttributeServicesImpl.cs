using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
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

            //foreach (var selectionValue in request.SelectionValues!)
            //{
            //    catalogAttribute.SelectionValues!.Add(new SelectionValue
            //    {
            //        Value = selectionValue,
            //        IsDeleted = false
            //    });
            //}

            await _context.CatalogAttributes.AddAsync(catalogAttribute);
            await _context.SaveChangesAsync();

            return catalogAttribute;
        }

        public async Task<bool> AddSelectionValueToCatalogAttribute(int catalogAttributeId, AddSelectionValueToCatalogAttributeRequest request)
        {
            var catalogAttribute = await _context
                .CatalogAttributes
                .Include(ca => ca.SelectionValues)
                .FirstOrDefaultAsync(ca => ca.CatalogAttributeId == catalogAttributeId
                               && ca.IsDeleted == false);

            if (catalogAttribute == null)
                throw new CustomNotFoundException("Can't found catalog attribute");

            catalogAttribute.SelectionValues!.Add(new SelectionValue
            {
                Value = request.SelectionValue,
                IsDeleted = false
            });

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteCatalogAttribute(int catalogAttributeId)
        {
            var catalogAttribute = await _context
                .CatalogAttributes
                .FirstOrDefaultAsync(ca => ca.CatalogAttributeId == catalogAttributeId
                                              && ca.IsDeleted == false);

            if (catalogAttribute == null)
                throw new CustomNotFoundException("Can't found catalog attribute");

            catalogAttribute.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSelectionValueFromCatalogAttribute(int catalogAttributeId, int selectionValueId)
        {
            var selecttionValue = await _context
                .SelectionValues
                .Include(sv => sv.CatalogAttribute)
                .FirstOrDefaultAsync(sv => sv.Id == selectionValueId
                    && sv.IsDeleted == false
                    && sv.CatalogAttribute!.CatalogAttributeId == catalogAttributeId
                );

            if (selecttionValue == null)
                throw new CustomNotFoundException("Can't found selection value");

            selecttionValue.IsDeleted = true;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EditCatalogAttribute(int catalogAttributeId, CatalogAttributeUpdateRequest request)
        {
            var catalogAttribute = await _context
                .CatalogAttributes
                .Where(ca => ca.CatalogAttributeId == catalogAttributeId
                                            && ca.IsDeleted == false)
                .FirstOrDefaultAsync();

            if (catalogAttribute == null)
                throw new CustomNotFoundException("Can't found catalog attribute");

            catalogAttribute.DisplayName = request.AttributeName;
            catalogAttribute.IsRequired = request.IsRequired;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ICollection<CatalogAttributeResponse>> GetCatalogAttributesByCatalogId(int catalogId)
        {
            var catalog = await _context.Catalogs
                .Include(c => c.CatalogAttributes!)
                .ThenInclude(ca => ca.SelectionValues)
                .Where(c => c.CatalogId == catalogId && c.IsDeleted == false)
                .FirstOrDefaultAsync();

            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            if (catalog.CatalogAttributes == null)
                throw new CustomNotFoundException("Can't found catalog attributes");

            var result = new List<CatalogAttributeResponse>();
            foreach (var catalogAttribute in catalog.CatalogAttributes)
            {
                if (catalogAttribute.IsDeleted == true)
                    continue;

                result.Add(new CatalogAttributeResponse
                {
                    CatalogAttributeId = catalogAttribute.CatalogAttributeId,
                    CatalogAttributeName = catalogAttribute.DisplayName,
                    CatalogAttributeKey = catalogAttribute.Key,
                    IsRequired = catalogAttribute.IsRequired,
                    CatalogAttributeType = catalogAttribute.Type,
                    SelectionValues = catalogAttribute.SelectionValues!.Where(s => s.IsDeleted == false)
                    .Select(s => new SelectionValueItemResponse
                    {
                        SelectionId = s.Id,
                        SelectionValue = s.Value
                    }).ToList()
                });
            }

            return result;
        }
    }
}
