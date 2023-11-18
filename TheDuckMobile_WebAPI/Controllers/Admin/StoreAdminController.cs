using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreAdminController : ControllerBase
    {
        private readonly IStoreAdminServices _storeAdminServices;
        public StoreAdminController(IStoreAdminServices storeAdminServices)
        {
            _storeAdminServices = storeAdminServices;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllStores()
        {
            var stores = await _storeAdminServices.GetAllStores();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = stores,
                Message = "Successfully retrieved all stores"
            });
        }
    }
}
