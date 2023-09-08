namespace TheDuckMobile_WebAPI.Entities
{
    public class StoreProduct
    {
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
