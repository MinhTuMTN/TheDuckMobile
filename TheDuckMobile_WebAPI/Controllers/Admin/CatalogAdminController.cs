using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("list")]
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
    }
}
