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

    }
}
