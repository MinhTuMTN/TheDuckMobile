using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CatalogAttributeAdminController : ControllerBase
    {
        private readonly ICatalogAttributeServices _catalogAttributeServices;

        public CatalogAttributeAdminController(ICatalogAttributeServices catalogAttributeServices)
        {
            _catalogAttributeServices = catalogAttributeServices;
        }

        [HttpPost]
        public async Task<IActionResult> AddCatalogAttribute([FromBody] CatalogAttributeRequest request)
        {
            var catalogAttribute = await _catalogAttributeServices.AddCatalogAttribute(request);

            if (catalogAttribute == null)
                throw new Exception("Catalog attribute could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog attribute added successfully.",
                Data = catalogAttribute
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetCatalogAttributesByCatalogId([FromQuery] int catalogId)
        {
            var catalogAttributes = await _catalogAttributeServices.GetCatalogAttributesByCatalogId(catalogId);

            if (catalogAttributes == null)
                throw new Exception("Catalog attributes could not be retrieved.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog attributes retrieved successfully.",
                Data = catalogAttributes
            });
        }

        [HttpPost("{catalogAttributeId}/selection-values")]
        public async Task<IActionResult> AddSelectionValueToCatalogAttribute([FromRoute] int catalogAttributeId,
            [FromBody] AddSelectionValueToCatalogAttributeRequest request)
        {
            var result = await _catalogAttributeServices
                .AddSelectionValueToCatalogAttribute(
                    catalogAttributeId,
                    request
                );

            if (result == false)
                throw new BadHttpRequestException("Selection value could not be added.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Selection value added successfully.",
                Data = result
            });
        }

        [HttpPut("{catalogAttributeId}")]
        public async Task<IActionResult> EditCatalogAttribute([FromRoute] int catalogAttributeId,
                       [FromBody] CatalogAttributeUpdateRequest request)
        {
            var result = await _catalogAttributeServices
                .EditCatalogAttribute(catalogAttributeId, request);

            if (result == false)
                throw new BadHttpRequestException("Catalog attribute could not be edited.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog attribute edited successfully.",
                Data = result
            });
        }

        [HttpDelete("{catalogAttributeId}")]
        public async Task<IActionResult> DeleteCatalogAttribute([FromRoute] int catalogAttributeId)
        {
            var result = await _catalogAttributeServices
                .DeleteCatalogAttribute(catalogAttributeId);

            if (result == false)
                throw new BadHttpRequestException("Catalog attribute could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Catalog attribute deleted successfully.",
                Data = result
            });
        }

        [HttpDelete("{catalogAttributeId}/selection-values/{selectionValueId}")]
        public async Task<IActionResult> DeleteSelectionValueFromCatalogAttribute([FromRoute] int catalogAttributeId,
                       [FromRoute] int selectionValueId)
        {
            var result = await _catalogAttributeServices
                .DeleteSelectionValueFromCatalogAttribute(
                                   catalogAttributeId,
                                                      selectionValueId
                                                                     );

            if (result == false)
                throw new BadHttpRequestException("Selection value could not be deleted.");

            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Selection value deleted successfully.",
                Data = result
            });
        }
    }
}
