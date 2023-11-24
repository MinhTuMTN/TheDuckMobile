using TheDuckMobile_WebAPI.Common;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CustomerDetailResponse
    {
        public Guid UserId { get; set; }
        public string? FullName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public int? Point { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public bool IsDeleted { get; set; }

        public CustomerDetailResponse(Customer customer)
        {
            UserId = customer.UserId;
            FullName = customer.FullName;
            Gender = customer.Gender.ToString();
            DateOfBirth = customer.DateOfBirth;
            Avatar = customer.Avatar;
            Phone = customer.Phone;
            Point = customer.Point;
            Orders = customer.Orders;
            IsDeleted = customer.IsDeleted;
        }
    }
}
