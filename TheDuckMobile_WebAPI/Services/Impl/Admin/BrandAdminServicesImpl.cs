using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class BrandAdminServicesImpl : IBrandAdminServices
    {
        private readonly DataContext _context;
        private readonly ICloudinaryServices _cloudinaryServices;

        public BrandAdminServicesImpl(DataContext context, ICloudinaryServices cloudinaryServices)
        {
            _context = context;
            _cloudinaryServices = cloudinaryServices;
        }

        public async Task<BrandResponse> AddBrand(BrandRequest request)
        {
            if (request.Image == null)
                throw new Exception("Image is required");

            var uploadImageURL = _cloudinaryServices.UploadImage(request.Image!);
            var brand = new Brand
            {
                BrandName = request.BrandName,
                Image = uploadImageURL.Result,
                IsDeleted = false,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now
            };

            await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();

            return new BrandResponse(brand);
        }

        public async Task<List<BrandListResponse>> GetAllBrands(bool isDeletedFilter)
        {
            var brands = _context
                .Brands
                .Include(b => b.Products)
                .AsQueryable();

            if (isDeletedFilter)
                brands = brands.Where(b => b.IsDeleted == false);

            var result = await brands.ToListAsync();

            return result.Select(b => new BrandListResponse(b)).ToList();
        }

        public async Task<List<BrandListResponse>> GetActiveBrands()
        {
            var brands = await _context.Brands
                .Include(b => b.Products)
                .Where(b => b.IsDeleted == false)
                .ToListAsync();
            return brands.Select(b => new BrandListResponse(b)).ToList();
        }

        public async Task<BrandResponse> EditBrand(int brandId, BrandRequest request)
        {
            var brand = await _context.Brands
                .Where(b => b.BrandId == brandId)
                .FirstOrDefaultAsync();

            if (brand == null)
                throw new CustomNotFoundException("Brand can't be found");

            if (request.Image != null)
            {
                var uploadImageURL = _cloudinaryServices.UploadImage(request.Image);
                brand.Image = uploadImageURL.Result;
            }

            if (request.BrandName != null)
                brand.BrandName = request.BrandName;

            brand.IsDeleted = request.IsDeleted;
            brand.LastModifiedAt = DateTime.Now;

            var products = brand.Products;

            if (products != null && products.Count > 0)
            {
                if (brand.IsDeleted)
                {
                    foreach (var product in products)
                    {
                        product.IsDeleted = true;
                        product.LastModifiedAt = DateTime.Now;
                    }
                }
                else
                {
                    foreach (var product in products)
                    {
                        product.IsDeleted = false;
                        product.LastModifiedAt = DateTime.Now;
                    }
                }
            }

            await _context.SaveChangesAsync();

            return new BrandResponse(brand);
        }

        public async Task<bool> DeleteBrand(int brandId)
        {
            var brand = await _context.Brands
                .Where(b => b.BrandId == brandId)
                .FirstOrDefaultAsync();

            if (brand == null)
                throw new CustomNotFoundException("Brand can't be found");

            brand.IsDeleted = true;
            brand.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
