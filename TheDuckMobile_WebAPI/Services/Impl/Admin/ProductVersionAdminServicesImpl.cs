using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
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
                .Where(ca => ca.CatalogId == product.CatalogId && ca.IsDeleted == false)
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
                PromotionPrice = request.Price,
                ReleaseTime = DateTime.Now,
                Quantity = 0,
                Images = imageUrls.ToArray(),
                CreatedAt = DateTime.UtcNow,
                LastModifiredAt = DateTime.UtcNow,
                IsDeleted = false,
                Sold = 0,
            };

            await _context.ProductVersions.AddAsync(productVersion);
            await _context.SaveChangesAsync();

            if ((request.Price > 0 && request.Price < product.ProductPrice) || product.ProductPrice == 0)
            {
                product.ProductPrice = request.Price;
                await _context.SaveChangesAsync();
            }

            await _context.SaveChangesAsync();

            // Update Promotion Price
            if ((request.Price > 0 && request.Price < product.PromotionPrice) || product.PromotionPrice == 0)
            {
                product.PromotionPrice = request.Price;
                await _context.SaveChangesAsync();
            }

            // Add Store Product
            // Foreach store
            var stores = await _context.Stores.ToListAsync();
            foreach (var store in stores)
            {
                var storeProduct = new StoreProduct
                {
                    CreatedAt = DateTime.UtcNow,
                    IsDelete = false,
                    IsSelling = true,
                    LastModifiedAt = DateTime.UtcNow,
                    ProductVersion = productVersion,
                    Quantity = 0,
                    Store = store,
                    StoreProductId = Guid.NewGuid(),
                };

                await _context.StoreProducts.AddAsync(storeProduct);
                await _context.SaveChangesAsync();
            }

            return productVersion;
        }

        public async Task<bool> DeleteProductVersion(Guid productVersionId)
        {
            // Set ProductVersion IsDeleted = true and Store Product IsDelete = true
            var productVersion = await _context
                .ProductVersions
                .Include(pv => pv.StoreProducts)
                .FirstOrDefaultAsync(pv => pv.ProductVersionId == productVersionId);

            // Check if product version is null
            if (productVersion == null)
                throw new CustomNotFoundException("Product version not found");

            // Set IsDeleted = true
            productVersion.IsDeleted = true;


            // Set Store Product IsDelete = true
            if (productVersion.StoreProducts != null)
            {
                foreach (var storeProduct in productVersion.StoreProducts)
                {
                    storeProduct.IsDelete = true;
                }
            }

            await _context.SaveChangesAsync();
            return productVersion.IsDeleted;
        }

        public async Task<ICollection<ProductVersionAttributesResponse>> GetProductVersionAttributes(Guid productId)
        {
            var product = await _context
                .Products
                .Include(p => p.Catalog)
                .Where(p => p.ProductId == productId && p.IsDeleted == false)
                .FirstOrDefaultAsync();

            if (product == null || product.Catalog == null)
                throw new CustomNotFoundException("Product not found");

            var catalogAttributes = await _context
                .CatalogAttributes
                .Include(ca => ca.SelectionValues)
                .Where(ca => ca.CatalogId == product.CatalogId && ca.IsDeleted == false)
                .ToListAsync();

            if (catalogAttributes == null)
                throw new CustomNotFoundException("Catalog attributes not found");

            var productVersionAttributes = new List<ProductVersionAttributesResponse>();
            foreach (var catalogAttribute in catalogAttributes)
            {
                var productVersionAttribute = new ProductVersionAttributesResponse
                {
                    Id = catalogAttribute.CatalogAttributeId,
                    Key = catalogAttribute.Key,
                    DisplayName = catalogAttribute.DisplayName,
                    Type = catalogAttribute.Type,
                    SelectionValues = new List<string>(),
                    IsRequired = catalogAttribute.IsRequired,
                };

                if (catalogAttribute.SelectionValues != null)
                    foreach (var selectionValue in catalogAttribute.SelectionValues)
                        productVersionAttribute.SelectionValues.Add(selectionValue.Value!);

                productVersionAttributes.Add(productVersionAttribute);
            }

            return productVersionAttributes;
        }

        public async Task<bool> RestoreProductVersion(Guid productVersionId)
        {
            // Set ProductVersion IsDeleted = false and Store Product IsDelete = false
            var productVersion = await _context
                .ProductVersions
                .Include(pv => pv.StoreProducts)
                .FirstOrDefaultAsync(pv => pv.ProductVersionId == productVersionId);

            // Check if product version is null
            if (productVersion == null)
                throw new CustomNotFoundException("Product version not found");

            // Set IsDeleted = false
            productVersion.IsDeleted = false;

            // Set Store Product IsDelete = false
            if (productVersion.StoreProducts != null)
            {
                foreach (var storeProduct in productVersion.StoreProducts)
                {
                    storeProduct.IsDelete = false;
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
