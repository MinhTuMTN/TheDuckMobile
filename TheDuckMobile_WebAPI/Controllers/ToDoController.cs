using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly DataContext _context;

        public ToDoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todos = await _context.ToDos.OrderByDescending(todo => todo.CreatedAt).ToListAsync();
            return Ok(new GenericResponse
            {
                Success = true,
                Message = "Success",
                Data = todos
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ToDoRequest request)
        {
            try
            {
                ToDo toDo = new ToDo
                {
                    Id = Guid.NewGuid(),
                    Task = request.Task,
                    IsCompleted = false,
                    CreatedAt = DateTime.Now,
                    LastUpdatedAt = DateTime.Now
                };
                await _context.ToDos.AddAsync(toDo);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Ok(new GenericResponse
                    {
                        Success = true,
                        Message = "Success",
                        Data = toDo
                    });
                }
                else throw new Exception();
            }
            catch
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to add new ToDo",
                    Data = null
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] ToDoRequest request)
        {
            try
            {
                var toDo = await _context.ToDos.FindAsync(id);
                if (toDo == null)
                    return NotFound(new GenericResponse
                    {
                        Success = false,
                        Message = "ToDo not found",
                        Data = null
                    });

                toDo.Task = request.Task;
                toDo.IsCompleted = request.IsCompleted;
                toDo.LastUpdatedAt = DateTime.Now;
                _context.ToDos.Update(toDo);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Ok(new GenericResponse
                    {
                        Success = true,
                        Message = "Success",
                        Data = toDo
                    });
                }
                else throw new Exception();
            }
            catch
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to update ToDo",
                    Data = null
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var toDo = await _context.ToDos.FindAsync(id);
                if (toDo == null)
                    return NotFound(new GenericResponse
                    {
                        Success = false,
                        Message = "ToDo not found",
                        Data = null
                    });

                _context.ToDos.Remove(toDo);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Ok(new GenericResponse
                    {
                        Success = true,
                        Message = "Success",
                        Data = null
                    });
                }
                else throw new Exception();
            }
            catch
            {
                return BadRequest(new GenericResponse
                {
                    Success = false,
                    Message = "Failed to delete ToDo",
                    Data = null
                });
            }
        }
    }
}
