using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Store;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StoreCatalogServicesImpl : IStoreCatalogServices
    {
        private readonly DataContext _dataContext;

        public StoreCatalogServicesImpl(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<List<CatalogFilterItemResponse>> GetCatalogFilterItems()
        {
            var catalogs = await _dataContext.Catalogs.ToListAsync();

            var catalogFilterItems = catalogs.Select(c => new CatalogFilterItemResponse
            {
                Name = c.CatalogName,
                Value = c.CatalogId
            }).ToList();

            return catalogFilterItems;
        }
    }
}
