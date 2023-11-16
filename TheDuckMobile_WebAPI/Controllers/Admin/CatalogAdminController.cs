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
    }
}
