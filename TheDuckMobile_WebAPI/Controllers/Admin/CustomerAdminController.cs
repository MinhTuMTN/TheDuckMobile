using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CustomerAdminController : ControllerBase
    {
        private readonly ICustomerAdminServices _customerServices;
        public CustomerAdminController(ICustomerAdminServices customerServices)
        {
            _customerServices = customerServices;
        }

        [HttpGet]
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

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerById([FromRoute] Guid customerId)
        {
            var customer = await _customerServices.GetCustomerById(customerId);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = customer,
                Message = "Successfully retrieved customer"
            });
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] string customerId)
        {
            var success = await _customerServices.DeleteCustomer(customerId);

            if (success == false)
                throw new Exception("Customer could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Customer deleted successfully.",
                Data = null,
            });
        }

        [HttpGet("restore/{customerId}")]
        public async Task<IActionResult> RestoreCustomer([FromRoute] string customerId)
        {
            var customer = await _customerServices.RestoreCustomer(customerId);

            if (customer == null)
                throw new BadHttpRequestException("Customer could not be restored.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Customer restored successfully.",
                Data = customer
            });
        }
    }
}
