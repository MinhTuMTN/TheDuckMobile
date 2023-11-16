using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;


namespace TheDuckMobile_WebAPI.Controllers
{
    public class ErrorController : ControllerBase
    {
        [Route("/error-handler")]
        public IActionResult ErrorHandler()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            // check type of error
            if (context?.Error is CustomNotFoundException)
            {
                return HandleNotFoundError(context);
            }
            else if (context?.Error is BadHttpRequestException)
            {
                return HandleBadRequestError(context);
            }
            else
            {
                return HandleInternalServerError(context);
            }
        }

        private IActionResult HandleInternalServerError(IExceptionHandlerFeature? context)
        {
            return StatusCode(500, new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }

        private IActionResult HandleNotFoundError(IExceptionHandlerFeature context)
        {
            return NotFound(new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }

        private IActionResult HandleBadRequestError(IExceptionHandlerFeature context)
        {
            return BadRequest(new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }
    }
}
