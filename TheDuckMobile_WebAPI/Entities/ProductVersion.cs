namespace TheDuckMobile_WebAPI.Entities
{
    public class ProductVersion
    {
        public Guid ProductVersionId { get; set; }
        public double Price { get; set; }
        public string RAM { get; set; }
        public float ScreenSize { get; set; }
        public string ScreenResolution { get; set; }
        public string ScreenTechnology { get; set; }
        public string ScanningFrequency { get; set; }
        public string Processor { get; set; }
        public string Material { get; set; }
        public string SizeAndMass { get; set; }
        public string Battery { get; set; }
        public DateTime ReleaseTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModifiredAt { get; set; }
        public bool IsDeleted { get; set; }

        public Guid ColorId { get; set; }
        public virtual Color Color { get; set; }

        public virtual ICollection<StoreProduct> StoreProducts { get; set;}
        public Guid PromotionId { get; set; }
        public virtual Promotion Promotion { get; set; }
    }
}
