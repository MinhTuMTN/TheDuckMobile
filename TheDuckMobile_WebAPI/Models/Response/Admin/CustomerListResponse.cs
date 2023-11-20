using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CustomerListResponse
    {
        public Guid UserId { get; set; }
        public string? FullName { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public int? Point { get; set; }
        public int NumberOfVotes { get; set; }
        public int NumberOfOrder { get; set; }
        public bool IsDeleted { get; set; }

        public CustomerListResponse(Customer customer)
        {
            UserId = customer.UserId;
            FullName = customer.FullName;
            Avatar = customer.Avatar;
            Phone = customer.Phone;
            Point = customer.Point;
            NumberOfVotes = customer.Votes == null ? 0 : customer.Votes.Count;
            NumberOfOrder = customer.Orders == null ? 0 : customer.Orders.Count;
            IsDeleted = customer.IsDeleted;
        }
    }
}
