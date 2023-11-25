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
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllCatalogs()
        {
            var catalogs = await _catalogServices.GetAllCatalogs();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = catalogs,
                Message = "Successfully retrieved all catalogs"
            });
        }

        [HttpGet("active")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
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
        public async Task<IActionResult> RestoreColor([FromRoute] int catalogId)
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
    }
}
