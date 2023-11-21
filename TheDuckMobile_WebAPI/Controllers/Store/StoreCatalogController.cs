using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
    public class StoreCatalogController : ControllerBase
    {
        private IStoreCatalogServices _storeCatalogServices;

        public StoreCatalogController(IStoreCatalogServices storeCatalogServices)
        {
            _storeCatalogServices = storeCatalogServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetStoreCatalog()
        {
            var result = await _storeCatalogServices.GetCatalogFilterItems();
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }
    }
}
