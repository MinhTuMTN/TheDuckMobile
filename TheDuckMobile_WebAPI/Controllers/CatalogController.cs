using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogServices catalogServices;
        public CatalogController(ICatalogServices catalogServices)
        {
            this.catalogServices = catalogServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetCatalogs()
        {
            var catalogs = await catalogServices.GetAllCatalogs();
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = catalogs
            });
        }

        [HttpGet("{catalogURL}")]
        public async Task<IActionResult> GetCatalogByURL([FromRoute] string catalogURL)
        {
            var catalog = await catalogServices.GetCatalogDetailByURL(catalogURL);
            if (catalog == null)
            {
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Catalog not found",
                    Data = null
                });
            }

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = catalog
            });
        }

        [HttpGet("{catalogURL}/products")]
        // https://localhost:7008/api/catalog/phone/products?%20minPrice=0&maxPrice=10000000000&brands=1&specialFeatures=1&specialFeatures=2
        // Create API to handle URL above
        public async Task<IActionResult> GetProductsByCatalogURL(
            [FromRoute] string catalogURL,
            [FromQuery] long minPrice = 0L,
            [FromQuery] long maxPrice = 10000000000L,
            [FromQuery] List<int>? brands = null,
            [FromQuery] List<int>? specialFeatures = null,
            [FromQuery] int page = 0,
            [FromQuery] int limit = 8,
            [FromQuery] string? orderBy = null
        )
        {
            var products = await catalogServices.GetProductsByCatalogURL(
                catalogURL,
                minPrice,
                maxPrice,
                brands,
                specialFeatures,
                page,
                limit,
                orderBy
            );

            if (products == null)
            {
                return NotFound(new GenericResponse
                {
                    Success = false,
                    Message = "Catalog not found",
                    Data = null
                });
            }

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = products
            });
        }

    }
}
