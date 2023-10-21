using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request
{
    public class ToDoRequest
    {
        [Required(ErrorMessage = "Task must not be empty")]
        public String Task { get; set; }
        public bool IsCompleted { get; set; }

        public ToDoRequest()
        {
            this.Task = "";
            this.IsCompleted = false;
        }
    }
}
