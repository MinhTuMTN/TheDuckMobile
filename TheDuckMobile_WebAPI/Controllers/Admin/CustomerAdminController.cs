using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAdminController : ControllerBase
    {
        private readonly ICustomerAdminServices _customerServices;
        public CustomerAdminController(ICustomerAdminServices customerServices)
        {
            _customerServices = customerServices;
        }

        [HttpGet]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerServices.GetAllCustomers();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = customers,
                Message = "Successfully retrieved all customers"
            });
        }
    }
}
