using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Response;


namespace TheDuckMobile_WebAPI.Controllers
{
    public class ErrorController : ControllerBase
    {
        [HttpGet]
        [HttpPost]
        [HttpPut]
        [HttpDelete]
        [HttpPatch]
        [Route("/error-handler")]
        public IActionResult ErrorHandler()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            if (context?.Error is CustomNotFoundException)
            {
                return HandleNotFoundError(context);
            }
            else if (context?.Error is ExceptionWithStatusCode)
            {
                return handleStatusCodeException((ExceptionWithStatusCode)(context?.Error)!);
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

        [NonAction]
        private IActionResult HandleInternalServerError(IExceptionHandlerFeature? context)
        {
            return StatusCode(500, new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }

        [NonAction]
        private IActionResult HandleNotFoundError(IExceptionHandlerFeature context)
        {
            return NotFound(new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }

        [NonAction]
        private IActionResult HandleBadRequestError(IExceptionHandlerFeature context)
        {
            return BadRequest(new GenericResponse
            {
                Success = false,
                Message = context?.Error.Message,
                Data = null
            });
        }

        [NonAction]
        private IActionResult handleStatusCodeException(ExceptionWithStatusCode? error)
        {
            return StatusCode(error!.StatusCode, new GenericResponse
            {
                Success = false,
                Message = error!.Message,
                Data = null
            });
        }
    }
}
