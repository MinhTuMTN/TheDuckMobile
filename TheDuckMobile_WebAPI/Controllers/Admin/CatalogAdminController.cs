using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogAdminController : ControllerBase
    {
        private readonly ICatalogAdminServices _catalogServices;
        public CatalogAdminController(ICatalogAdminServices catalogServices)
        {
            _catalogServices = catalogServices;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCatalogs([FromQuery] bool isDeletedFilter)
        {
            var catalogs = await _catalogServices.GetAllCatalogs(isDeletedFilter);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogs,
                Message = "Successfully retrieved all catalogs"
            });
        }

        [HttpGet("active")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetActiveCatalogs()
        {
            var catalogs = await _catalogServices.GetActiveCatalogs();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogs,
                Message = "Successfully retrieved active catalogs"
            });
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCatalog([FromBody] AddCatalogRequest request)
        {
            var catalog = await _catalogServices.AddCatalog(request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalog,
                Message = "Successfully added catalog"
            });
        }

        [HttpPost("{catalogId}/brands")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBrandToCatalog([FromRoute] int catalogId, [FromBody] AddBrandToCatalogRequest request)
        {
            var catalog = await _catalogServices.AddBrandToCatalog(catalogId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalog,
                Message = "Successfully added brand to catalog"
            });
        }

        [HttpPost("{catalogId}/special-features")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSpecialFeatureToCatalog([FromRoute] int catalogId, [FromBody] AddSpecialFeatureToCatalogRequest request)
        {
            var catalog = await _catalogServices.AddSpecialFeatureToCatalog(catalogId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalog,
                Message = "Successfully added special feature to catalog"
            });
        }

        [HttpGet("{catalogId}/attributes")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCatalogAttributes([FromRoute] int catalogId)
        {
            var catalogAttributes = await _catalogServices.GetCatalogAttributes(catalogId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogAttributes,
                Message = "Successfully retrieved catalog attributes"
            });
        }

        [HttpPut("{catalogId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditCatalog([FromRoute] int catalogId, [FromBody] AddCatalogRequest request)
        {
            var catalog = await _catalogServices.EditCatalog(catalogId, request);

            if (catalog == null)
                throw new BadHttpRequestException("Catalog could not be edited.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog edited successfully.",
                Data = catalog
            });
        }

        [HttpDelete("{catalogId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCatalog([FromRoute] int catalogId)
        {
            var success = await _catalogServices.DeleteCatalog(catalogId);

            if (!success)
                throw new BadHttpRequestException("Catalog could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Color deleted successfully.",
                Data = null
            });
        }

        [HttpGet("restore/{catalogId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RestoreCatalog([FromRoute] int catalogId)
        {
            var catalog = await _catalogServices.RestoreCatalog(catalogId);

            if (catalog == null)
                throw new BadHttpRequestException("Catalog could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog restored successfully.",
                Data = catalog
            });
        }

        [HttpGet("{catalogId}/special-features")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCatalogSpecialFeatures([FromRoute] int catalogId)
        {
            var catalogSpecialFeatures = await _catalogServices.GetCatalogSpecialFeatures(catalogId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogSpecialFeatures,
                Message = "Successfully retrieved catalog special features"
            });
        }

        [HttpDelete("{catalogId}/special-features/{specialFeatureId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCatalogSpecialFeature([FromRoute] int catalogId, [FromRoute] int specialFeatureId)
        {
            var success = await _catalogServices.DeleteCatalogSpecialFeature(catalogId, specialFeatureId);

            if (!success)
                throw new BadHttpRequestException("Catalog special feature could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog special feature deleted successfully.",
                Data = null
            });
        }

        [HttpGet("{catalogId}/brands")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCatalogBrands([FromRoute] int catalogId)
        {
            var catalogBrands = await _catalogServices.GetCatalogBrands(catalogId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogBrands,
                Message = "Successfully retrieved catalog brands"
            });
        }

        [HttpDelete("{catalogId}/brands/{brandId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCatalogBrand([FromRoute] int catalogId, [FromRoute] int brandId)
        {
            var success = await _catalogServices.DeleteCatalogBrand(catalogId, brandId);

            if (!success)
                throw new BadHttpRequestException("Catalog brand could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog brand deleted successfully.",
                Data = null
            });
        }
    }
}
