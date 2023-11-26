using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class ProductServicesImpl : IProductServices
    {
        private readonly DataContext _context;

        public ProductServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ProductHomeResponse>> GetBestSellingProducts(int numberOfProducts)
        {
            var bestSellingProducts = await _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.Votes!.Count)
                .Take(numberOfProducts)
                .ToListAsync();
            return bestSellingProducts.Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<List<ProductHomeResponse>> GetHighlyRatedProducts(int numberOfProducts)
        {
            var highlyRatedProducts = await _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.Rate)
                .Take(numberOfProducts)
                .ToListAsync();
            return highlyRatedProducts.Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<List<ProductHomeResponse>> GetNewestProducts(int numberOfProducts)
        {
            var newestProducts = _context.Products
                .Include(p => p.Votes)
                .OrderByDescending(p => p.CreatedAt)
                .Take(numberOfProducts)
                .ToListAsync();

            return (await newestProducts).Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<List<ProductCartResponse>> GetProductCartDetails(List<UserCartItem> userCartItems)
        {
            List<ProductCartResponse> productCartResponses = new List<ProductCartResponse>();

            foreach (UserCartItem userCartItem in userCartItems)
            {
                var productVersion = await _context.ProductVersions
                    .Include(pv => pv.Product)
                    .Include(pv => pv.Color)
                    .FirstOrDefaultAsync(pv => pv.ProductVersionId == userCartItem.ProductVersionId);

                if (productVersion is null)
                    throw new CustomNotFoundException($"Product version with product version id {userCartItem.ProductVersionId} not found");

                productCartResponses.Add(new ProductCartResponse
                {
                    ProductVersionId = productVersion.ProductVersionId,
                    ProductId = productVersion.ProductId,
                    ProductName = productVersion.Product!.ProductName,
                    VersionName = productVersion.VersionName,
                    Thumbnail = productVersion.Product.Thumbnail,
                    Price = productVersion.Price,
                    PromotionPrice = productVersion.PromotionPrice,
                    Quantity = userCartItem.Quantity,
                    ColorName = productVersion.Color!.ColorName,
                    ColorCode = productVersion.Color.ColorCode
                });
            }

            return productCartResponses;
        }

        public async Task<List<ProductHomeResponse>> GetProductRelative(Guid productId)
        {
            // Get 4 products with same catalog and best selling
            var product = await _context.Products
                .Include(p => p.Votes)
                .Include(p => p.Catalog)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product is null)
                throw new CustomNotFoundException("Product not found");

            var relativeProducts = await _context.Products
                .Include(p => p.Votes)
                .Where(p => p.CatalogId == product.Catalog!.CatalogId
                    && p.ProductId != product.ProductId
                    && p.IsDeleted == false)
                .OrderByDescending(p => p.Sold)
                .Take(4)
                .ToListAsync();

            return relativeProducts.Select(p => new ProductHomeResponse(p)).ToList();
        }

        public async Task<ProductDetailResponse> GetProductVersionsByProductId(Guid productId)
        {
            var product = await _context.Products
                .Include(p => p.Votes)
                .Include(p => p.Catalog)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product is null)
                throw new CustomNotFoundException("Product not found");

            // CatalogAttributes
            Dictionary<string, string>? catalogAttributesResult = new Dictionary<string, string>();
            var catalogAttributes = await _context.CatalogAttributes
                .Where(ca => ca.CatalogId == product.CatalogId)
                .ToListAsync();

            foreach (CatalogAttribute catalogAttribute in catalogAttributes)
                catalogAttributesResult.Add(catalogAttribute.Key!, catalogAttribute.DisplayName!);

            // Product Color
            var colors = await _context.ProductVersions
                .Where(pv => pv.ProductId == productId && pv.IsDeleted == false)
                .Select(pv => pv.Color)
                .Distinct()
                .ToListAsync();

            ICollection<ProductColorVersions> colorVersions = new List<ProductColorVersions>();
            foreach (Color? color in colors)
            {
                if (color is null)
                    continue;

                var productVersions = await _context.ProductVersions
                    .Where(pv => pv.ProductId == productId && pv.Color == color && pv.IsDeleted == false)
                    .ToListAsync();

                colorVersions.Add(new ProductColorVersions(color, productVersions));
            }


            return new ProductDetailResponse
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                Rate = product.Rate,
                CatalogAttributes = catalogAttributesResult,
                ProductColorVersions = colorVersions,
                Votes = product.Votes
            };
        }

        public async Task<PaginationResponse> SearchProduct(string query, string? orderBy, int page, int limit)
        {

            var products = _context.Products
                .Include(p => p.Votes)
                .Include(p => p.Brand)
                .Where(p => EF.Functions.FreeText(p.ProductName!, query)
                    || p.Brand!.BrandName!.Contains(query)
                );

            switch (orderBy)
            {
                case "price_asc":
                    products = products.OrderBy(p => p.ProductPrice);
                    break;
                case "price_desc":
                    products = products.OrderByDescending(p => p.ProductPrice);
                    break;
                case "best_seller":
                    products = products.OrderByDescending(p => p.Sold);
                    break;
                default:
                    products = products.OrderByDescending(p => p.CreatedAt);
                    break;
            }

            var totalProduct = products.Count();
            var totalPages = (int)Math.Ceiling((double)totalProduct / limit);

            products = products.Skip(page * limit).Take(limit);
            var productsResponse = await products.Select(p => new ProductHomeResponse(p)).ToListAsync();

            return new PaginationResponse
            {
                TotalPages = totalPages,
                Limit = limit,
                Page = page,
                TotalObjects = totalProduct,
                Objects = productsResponse
            };
        }
    }
}
