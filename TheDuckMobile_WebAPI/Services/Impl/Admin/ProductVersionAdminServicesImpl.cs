using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class ProductVersionAdminServicesImpl : IProductVersionAdminServices
    {
        private readonly IJsonServices _jsonServices;
        private readonly DataContext _context;
        private readonly ICloudinaryServices _cloudinaryServices;

        public ProductVersionAdminServicesImpl(
            IJsonServices jsonServices,
            DataContext context,
            ICloudinaryServices cloudinaryServices)
        {
            _jsonServices = jsonServices;
            _context = context;
            _cloudinaryServices = cloudinaryServices;
        }

        public async Task<ProductVersion> CreateProductVersion(ProductVersionRequest request)
        {
            // Product
            var product = await _context
                .Products
                .Include(p => p.Catalog)
                .FirstOrDefaultAsync(p => p.ProductId == request.ProductId);

            if (product == null)
                throw new CustomNotFoundException("Product not found");

            // Specification
            var catalogAttributes = await _context
                .CatalogAttributes
                .Where(ca => ca.CatalogId == product.CatalogId)
                .ToListAsync();

            IDictionary<string, object> specification = await _jsonServices
                .DeserializeObject(request.Specification!, catalogAttributes);

            // Color
            var color = await _context
                .Colors
                .FirstOrDefaultAsync(c => c.ColorId == Guid.Parse(request.ColorId!));

            if (color == null)
                throw new CustomNotFoundException("Color not found");


            // Images
            // Create string array to store Image URLs
            List<string> imageUrls = new List<string>();
            foreach (var image in request.Images!)
            {
                var uploadResult = await _cloudinaryServices.UploadImage(image);

                if (uploadResult == null)
                    throw new BadHttpRequestException("Can't upload image");

                imageUrls.Add(uploadResult);
            }

            if (request.VersionName == null || request.VersionName.Trim().Length == 0)
                throw new BadHttpRequestException("Version name can't be empty");

            var productVersion = new ProductVersion
            {
                VersionName = request.VersionName,
                Product = product,
                Specification = _jsonServices.SerializeObject(specification),
                Price = request.Price,
                Color = color,
                PromotionPrice = request.PromotionPrice == 0 ? request.Price : request.PromotionPrice,
                ReleaseTime = request.ReleaseTime,
                Quantity = request.Quantity,
                Images = imageUrls.ToArray(),
                CreatedAt = DateTime.UtcNow,
                LastModifiredAt = DateTime.UtcNow,
                IsDeleted = false,
                Sold = 0,
            };

            await _context.ProductVersions.AddAsync(productVersion);
            await _context.SaveChangesAsync();

            if (request.Price > 0 && request.Price < product.ProductPrice)
            {
                product.ProductPrice = request.Price;
                await _context.SaveChangesAsync();
            }

            // Update product quantity
            product.Quantity += request.Quantity;
            await _context.SaveChangesAsync();

            // Update Promotion Price
            if (request.PromotionPrice > 0 && request.PromotionPrice < product.PromotionPrice)
            {
                product.PromotionPrice = request.PromotionPrice;
                await _context.SaveChangesAsync();
            }

            return productVersion;
        }
    }
}
