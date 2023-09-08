namespace TheDuckMobile_WebAPI.Entities
{
    public class Color
    {
        public Guid ColorId { get; set; }
        public string ColorName { get; set; }
        public string ColorIcon { get; set; }
        public List<string> Images { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<ProductVersion> ProductVersions { get; set; } = new List<ProductVersion>();

        public Guid ProductId;
        public virtual Product Product { get; set; }


    }
}
