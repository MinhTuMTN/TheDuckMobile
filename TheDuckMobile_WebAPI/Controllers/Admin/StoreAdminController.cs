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

        [HttpGet]
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

        [HttpGet("{storeId}")]
        public async Task<IActionResult> GetStoreById([FromRoute] string storeId)
        {
            var store = await _storeAdminServices.GetStoreById(storeId);

            if (store == null)
                throw new BadHttpRequestException("Store could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Store retrieved successfully.",
                Data = store
            });
        }

        [HttpDelete("{storeId}")]
        public async Task<IActionResult> DeleteStore([FromRoute] string storeId)
        {
            var success = await _storeAdminServices.DeleteStore(storeId);

            if (!success)
                throw new BadHttpRequestException("Store could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Store deleted successfully.",
                Data = null
            });
        }

        [HttpGet("restore/{storeId}")]
        public async Task<IActionResult> RestoreColor([FromRoute] string storeId)
        {
            var store = await _storeAdminServices.RestoreStore(storeId);

            if (store == null)
                throw new BadHttpRequestException("Store could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Store restored successfully.",
                Data = store
            });
        }
    }
}
