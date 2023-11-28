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
    [Authorize(Roles = "Admin")]
    public class StoreAdminController : ControllerBase
    {
        private readonly IStoreAdminServices _storeAdminServices;
        private readonly IStaffAdminServices _staffAdminServices;
        public StoreAdminController(IStoreAdminServices storeAdminServices, IStaffAdminServices staffAdminServices)
        {
            _storeAdminServices = storeAdminServices;
            _staffAdminServices = staffAdminServices;
        }

        [HttpGet]
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

        [HttpPost]
        public async Task<IActionResult> CreateStore([FromBody] UpdateStoreRequest request)
        {
            var store = await _storeAdminServices.CreateStore(request);

            if (store == null)
                throw new BadHttpRequestException("Store could not be created.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Store created successfully.",
                Data = store
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

        [HttpPut("{storeId}")]
        public async Task<IActionResult> UpdateStore([FromRoute] Guid storeId, [FromBody] UpdateStoreRequest request)
        {
            var store = await _storeAdminServices.UpdateStore(storeId, request);

            if (store == null)
                throw new BadHttpRequestException("Store could not be updated.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Store updated successfully.",
                Data = store
            });
        }

        [HttpGet("{storeId}/staff")]
        public async Task<IActionResult> GetAllStaffs([FromRoute] Guid storeId)
        {
            var staffs = await _staffAdminServices.GetAllStaffs(storeId);

            if (staffs == null)
                throw new BadHttpRequestException("Staffs could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Staffs retrieved successfully.",
                Data = staffs
            });
        }

        [HttpPost("{storeId}/staff")]
        public async Task<IActionResult> AddStaff([FromRoute] Guid storeId, [FromBody] CreateStaffRequest request)
        {
            var staff = await _staffAdminServices.CreateStaff(storeId, request);

            if (staff == null)
                throw new BadHttpRequestException("Staff could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Staff added successfully.",
                Data = staff
            });
        }

        [HttpGet("{storeId}/staff/{staffId}/reset")]
        public async Task<IActionResult> ResetStaffPassword([FromRoute] Guid storeId, [FromRoute] Guid staffId)
        {
            var staff = await _staffAdminServices.ResetPassword(storeId, staffId);

            if (staff == null)
                throw new BadHttpRequestException("Staff could not be reset password.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Staff reset password successfully.",
                Data = staff
            });
        }

        [HttpGet("{storeId}/province")]
        public async Task<IActionResult> GetAllProvinces([FromRoute] Guid storeId)
        {
            var provinces = await _storeAdminServices.GetAllProvinces(storeId);

            if (provinces == null)
                throw new BadHttpRequestException("Provinces could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Provinces retrieved successfully.",
                Data = provinces
            });
        }

        [HttpPost("{storeId}/province")]
        public async Task<IActionResult> AddProvince([FromRoute] Guid storeId,
            [FromBody] StoreProvinceRequest request)
        {
            var province = await _storeAdminServices.AddProvince(storeId, request);

            if (province == null)
                throw new BadHttpRequestException("Province could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Province added successfully.",
                Data = province
            });
        }
    }
}
