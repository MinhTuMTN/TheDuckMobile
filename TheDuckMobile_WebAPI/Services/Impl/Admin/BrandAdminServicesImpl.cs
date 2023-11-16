using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
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

        public async Task<List<BrandListResponse>> GetAllBrands()
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
                .Where(b => b.BrandId == brandId && b.IsDeleted == false)
                .FirstOrDefaultAsync();

            if (brand == null)
                throw new Exception("Brand can't be found");

            if (request.Image != null)
            {
                var uploadImageURL = _cloudinaryServices.UploadImage(request.Image);
                brand.Image = uploadImageURL.Result;
            }

            if (request.BrandName != null)
                brand.BrandName = request.BrandName;

            brand.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return new BrandResponse(brand);
        }
    }
}
