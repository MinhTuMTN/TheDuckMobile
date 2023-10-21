using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{
    public class ToDo
    {
        [Key]
        public Guid Id { get; set; }
        public string Task { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }

        public ToDo()
        {
            this.Task = "";
        }
    }
}
