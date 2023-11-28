using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class WardAdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWardAdminServices wardAdminServices;

        public WardAdminController(DataContext context, IWardAdminServices wardAdminServices)
        {
            _context = context;
            this.wardAdminServices = wardAdminServices;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWard([FromBody] AddWardRequest request)
        {
            var ward = await wardAdminServices.CreateWard(request.DistrictId, request.WardName!);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = ward,
                Message = "Successfully created ward"
            });
        }
    }
}
