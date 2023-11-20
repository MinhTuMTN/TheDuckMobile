using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreServices storeServices;

        public StoreController(IStoreServices storeServices)
        {
            this.storeServices = storeServices;
        }

        [HttpGet("store-addresses")]
        public async Task<IActionResult> GetAllStoreAddresses()
        {
            var storeAddresses = await storeServices.GetAllStoreAddresses();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = storeAddresses,
                Message = "Successfully retrieved all store addresses"
            });
        }
    }
}
