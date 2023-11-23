using System.Linq;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Store;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Services.Impl.Store
{
    public class StoreProductServicesImpl : IStoreProductServices
    {
        private readonly DataContext _context;
        private readonly IStaffServices _staffServices;

        public StoreProductServicesImpl(DataContext context, IStaffServices staffServices)
        {
            _context = context;
            _staffServices = staffServices;
        }

        public async Task<PaginationResponse> GetStoreProducts(Guid staffId,
            string? search,
            int page,
            int limit,
            List<int>? categoryIds,
            List<bool>? storeProductStatus,
            List<int>? storeProductQuantity
        )
        {
            var store = await _staffServices.GetStoreByStaffId(staffId);

            var storeProducts = _context
                .StoreProducts
                .Include(sp => sp.ProductVersion!)
                .ThenInclude(pv => pv.Product!)
                .ThenInclude(p => p.Catalog!)
                .Where(sp => sp.StoreId == store.StoreId);

            if (search != null && search.Trim() != "")
                storeProducts = storeProducts.Where(sp =>
                    sp.ProductVersion!.Product!.ProductName!.Contains(search)
                );

            if (categoryIds != null && categoryIds.Count > 0)
            {
                storeProducts = storeProducts
                        .Where(sp => categoryIds.Contains(sp.ProductVersion!.Product!.Catalog!.CatalogId));
            }

            if (storeProductStatus != null && storeProductStatus.Count > 0)
            {
                storeProducts = storeProducts.Where(sp =>
                    (storeProductStatus.Contains(true) && sp.ProductVersion!.IsDeleted == false) ||
                    (storeProductStatus.Contains(false) && sp.ProductVersion!.IsDeleted == true)
                );
            }

            if (storeProductQuantity != null && storeProductQuantity.Count > 0)
            {
                storeProducts = storeProducts.Where(sp =>
                    (storeProductQuantity.Contains(0) && sp.Quantity > 10) ||
                    (storeProductQuantity.Contains(1) && (sp.Quantity <= 10 && sp.Quantity > 0)) ||
                    (storeProductQuantity.Contains(2) && sp.Quantity <= 0)
                );
            }

            //Pagination
            var total = await storeProducts.CountAsync();
            var totalPages = (int)Math.Ceiling((double)total / limit);
            var offset = page * limit;
            storeProducts = storeProducts.Skip(offset).Take(limit);

            var storeProductList = await storeProducts
                .Select(sp => new StoreProductListResponse(sp))
                .ToListAsync();

            return new PaginationResponse
            {
                Limit = limit,
                TotalPages = totalPages,
                Objects = storeProductList,
                Page = page,
                TotalObjects = total
            };
        }

        public async Task<bool> UpdateStoreProductQuantity(Guid staffId, Guid storeProductId, int quantity)
        {
            var store = await _staffServices.GetStoreByStaffId(staffId);
            var storeProduct = await _context
                .StoreProducts
                .Where(s => s.StoreProductId == storeProductId && s.StoreId == store.StoreId && s.IsDelete == false)
                .FirstOrDefaultAsync();

            if (storeProduct is null)
                throw new CustomNotFoundException("Can't found store product");

            storeProduct.Quantity += quantity;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
