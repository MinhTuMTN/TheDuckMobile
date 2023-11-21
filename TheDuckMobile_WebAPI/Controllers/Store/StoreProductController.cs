using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Store;

namespace TheDuckMobile_WebAPI.Controllers.Store
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreProductController : ControllerBase
    {
        private readonly IStoreProductServices _storeProductServices;

        public StoreProductController(IStoreProductServices storeProductServices)
        {
            _storeProductServices = storeProductServices;
        }

        [HttpGet]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> GetStoreProducts(
            [FromQuery] int page = 0,
            [FromQuery] int limit = 1,
            [FromQuery] List<int>? catalogIds = null,
            [FromQuery] List<bool>? storeProductStatus = null,
            [FromQuery] List<int>? storeProductQuantity = null
        )
        {
            // Get Staff Id
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var result = await _storeProductServices
                .GetStoreProducts(
                    Guid.Parse(id!),
                    page,
                    limit,
                    catalogIds,
                    storeProductStatus,
                    storeProductQuantity
                );

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }
    }
}
