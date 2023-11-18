using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogAttributeAdminController : ControllerBase
    {
        private readonly ICatalogAttributeServices _catalogAttributeServices;

        public CatalogAttributeAdminController(ICatalogAttributeServices catalogAttributeServices)
        {
            _catalogAttributeServices = catalogAttributeServices;
        }

        [HttpPost]
        public async Task<IActionResult> AddCatalogAttribute([FromBody] CatalogAttributeRequest request)
        {
            var catalogAttribute = await _catalogAttributeServices.AddCatalogAttribute(request);

            if (catalogAttribute == null)
                throw new Exception("Catalog attribute could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog attribute added successfully.",
                Data = catalogAttribute
            });
        }
    }
}
