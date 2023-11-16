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
    public class BrandAdminController : ControllerBase
    {
        private readonly IBrandAdminServices _brandServices;
        public BrandAdminController(IBrandAdminServices brandServices)
        {
            _brandServices = brandServices;
        }

        [HttpGet]
        [AllowAnonymous]
        /*[Authorize(Roles = "admin")]*/
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _brandServices.GetAllBrands();
            return Ok(new GenericResponse
            {
                Success = true,
                Data = brands,
                Message = "Successfully retrieved all brands"
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddBrand([FromForm] BrandRequest request)
        {
            var result = await _brandServices.AddBrand(request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = result,
                Message = "Successfully added brand"
            });
        }

        [HttpPut("{brandId}")]
        public async Task<IActionResult> EditBrand([FromRoute] int brandId, [FromForm] BrandRequest request)
        {
            var result = await _brandServices.EditBrand(brandId, request);
            return Ok(new GenericResponse
            {
                Success = true,
                Data = result,
                Message = "Successfully edited brand"
            });
        }

        [HttpDelete("{brandId}")]
        public async Task<IActionResult> DeleteBrand([FromRoute] int brandId)
        {
            var result = await _brandServices.DeleteBrand(brandId);

            if (!result)
                throw new Exception("Failed to delete brand");

            return Ok(new GenericResponse
            {
                Success = true,
                Data = null,
                Message = "Successfully deleted brand"
            });
        }
    }
}
