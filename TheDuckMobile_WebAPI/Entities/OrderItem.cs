namespace TheDuckMobile_WebAPI.Entities
{
    public class OrderItem
    {
        public Guid OrderId;
        public Order Order { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
