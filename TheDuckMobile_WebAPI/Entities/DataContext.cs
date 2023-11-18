using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Entities
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("TheDuckMobile"));
        }



        //public override int SaveChanges()
        //{
        //    return base.SaveChanges();
        //}

        //private void TrackDate()
        //{
        //    foreach (var entityEntry in ChangeTracker.Entries())
        //    {
        //        if (entityEntry.Entity is User e
        //            && entityEntry.State != EntityState.Added)
        //        {
        //            //e.UpdatedAt = DateTime.Now;
        //        }
        //    }
        //}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region List String Configuration
            modelBuilder.Entity<ProductVersion>()
                .Property(pv => pv.Images)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                );

            modelBuilder.Entity<Vote>()
                .Property(v => v.Images)
                .HasConversion(
                    v => string.Join(',', v == null ? "" : v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                );
            #endregion


            #region One to One
            modelBuilder.Entity<Store>()
                .HasOne(store => store.Address)
                .WithOne(address => address.Store)
                .HasForeignKey<Address>(add => add.StoreId);
            #endregion

            #region Primary Key 
            // OrderItem Primary Key
            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => new { oi.OrderId, oi.StoreProductId });
            #endregion


            #region One to Many
            // Quan hệ Catalog - CatalogAttribute
            modelBuilder.Entity<CatalogAttribute>()
                .HasOne(catalogAttribute => catalogAttribute.Catalog)
                .WithMany(catalog => catalog.CatalogAttributes)
                .HasForeignKey(catalogAttribute => catalogAttribute.CatalogId);

            // Quan hệ CatalogAttribute - SelectionValue
            modelBuilder.Entity<SelectionValue>()
                .HasOne(selectionValue => selectionValue.CatalogAttribute)
                .WithMany(catalogAttribute => catalogAttribute.SelectionValues)
                .HasForeignKey(selectionValue => selectionValue.CatalogAttributeId);


            // Quan hệ Product - Catalog
            modelBuilder.Entity<Product>()
                .HasOne<Catalog>(product => product.Catalog)
                .WithMany(catalog => catalog.Products)
                .HasForeignKey(product => product.CatalogId);

            //Quan hệ district - provine
            modelBuilder.Entity<District>()
                .HasOne(district => district.Provine)
                .WithMany(provine => provine.Districts)
                .HasForeignKey(district => district.ProvineId);

            //Quan hệ ward - district
            modelBuilder.Entity<Ward>()
                .HasOne(w => w.District)
                .WithMany(district => district.Wards)
                .HasForeignKey(w => w.DistrictId);

            //Quan hệ address - ward
            modelBuilder.Entity<Address>()
                .HasOne(address => address.Ward)
                .WithMany(w => w.Addresses)
                .HasForeignKey(address => address.WardId)
                .OnDelete(DeleteBehavior.Restrict);

            // Quan hệ User - Address
            modelBuilder.Entity<Address>()
                .HasOne<User>(add => add.User)
                .WithMany(user => user.Addresses)
                .HasForeignKey(add => add.UserId)
                .OnDelete(DeleteBehavior.Restrict);



            // Brand - Product Relationship
            modelBuilder.Entity<Product>()
                .HasOne<Brand>(product => product.Brand)
                .WithMany(brand => brand.Products)
                .HasForeignKey(product => product.BrandId);

            // OS - Product Relationship
            modelBuilder.Entity<Product>()
                .HasOne<OS>(product => product.OS)
                .WithMany(os => os.Products)
                .HasForeignKey(product => product.OSId);

            // Product - Vote Relationship
            modelBuilder.Entity<Vote>()
                .HasOne<Product>(vote => vote.Product)
                .WithMany(product => product.Votes)
                .HasForeignKey(vote => vote.ProductId);

            // Customer - Vote Relationship
            modelBuilder.Entity<Vote>()
                .HasOne<Customer>(vote => vote.Customer)
                .WithMany(customer => customer.Votes)
                .HasForeignKey(vote => vote.CustomerId);

            // OrderItem - Promotion Relationship
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Promotion)
                .WithMany(promotion => promotion.OrderItems)
                .HasForeignKey(oi => oi.PromotionId);

            // OrderItem - StoreProduct Relationship
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.StoreProduct)
                .WithMany(StoreProduct => StoreProduct.OrderItems)
                .HasForeignKey(oi => oi.StoreProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // OrderItem - Order Relationship
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(order => order.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            // Order - Customer Relationship
            modelBuilder.Entity<Order>()
                .HasOne(order => order.Customer)
                .WithMany(customer => customer.Orders)
                .HasForeignKey(order => order.CustomerId);

            // Order - Staff Relationship
            modelBuilder.Entity<Order>()
                .HasOne(order => order.Staff)
                .WithMany(staff => staff.Orders)
                .HasForeignKey(order => order.StaffId)
                .OnDelete(DeleteBehavior.Restrict);

            // Order - Store Relationship
            modelBuilder.Entity<Order>()
                .HasOne(order => order.Store)
                .WithMany(store => store.Orders)
                .HasForeignKey(order => order.StoreId)
                .OnDelete(DeleteBehavior.Restrict);


            //Quan hệ staff - store
            modelBuilder.Entity<Staff>()
                .HasOne(staff => staff.Store)
                .WithMany(store => store.Staffs)
                .HasForeignKey(staff => staff.StoreId)
                .OnDelete(DeleteBehavior.Restrict);

            //Quan hệ StoreProduct - Store
            modelBuilder.Entity<StoreProduct>()
                .HasOne(sp => sp.Store)
                .WithMany(store => store.StoreProducts)
                .HasForeignKey(sp => sp.StoreId);

            //Quan hệ StoreProduct - ProductVersion
            modelBuilder.Entity<StoreProduct>()
                .HasOne(sp => sp.ProductVersion)
                .WithMany(pdv => pdv.StoreProducts)
                .HasForeignKey(sp => sp.ProductVersionId);

            // Quan hê ProductVersion - Color
            modelBuilder.Entity<ProductVersion>()
                .HasOne(pv => pv.Color)
                .WithMany(color => color.ProductVersions)
                .HasForeignKey(pv => pv.ColorId);

            // Quan hệ ProductVersion - Product
            modelBuilder.Entity<ProductVersion>()
                .HasOne(pv => pv.Product)
                .WithMany(product => product.ProductVersions)
                .HasForeignKey(pv => pv.ProductId);

            // Vote - Customer Relationship
            modelBuilder.Entity<Vote>()
                .HasOne<Customer>(vote => vote.Customer)
                .WithMany(customer => customer.Votes)
                .HasForeignKey(vote => vote.CustomerId);

            //// Promotion - ProductVersion Relationship
            //modelBuilder.Entity<ProductVersion>()
            //    .HasOne<Promotion>(productVersion => productVersion.Promotion)
            //    .WithMany(promotion => promotion.ProductVersions)
            //    .HasForeignKey(productVersion => productVersion.PromotionId);

            // Promotion - ProductVersion Relationship
            modelBuilder.Entity<Promotion>()
                .HasOne(promotion => promotion.ProductVersion)
                .WithMany(productVersion => productVersion.Promotions)
                .HasForeignKey(promotion => promotion.ProductVersionId);



            #endregion

            #region Many to Many with extra column
            // Catalog - Brand Relationship
            modelBuilder.Entity<Catalog>()
                .HasMany<Brand>(catalog => catalog.Brands)
                .WithMany(brand => brand.Catalogs);

            // SpecialFeature - Catalog Relationship
            modelBuilder.Entity<Catalog>()
                .HasMany<SpecialFeature>(catalog => catalog.SpecialFeatures)
                .WithMany(specialFeature => specialFeature.Catalogs);

            // SpecialFeature - Product Relationship
            modelBuilder.Entity<Product>()
                .HasMany<SpecialFeature>(product => product.SpecialFeatures)
                .WithMany(specialFeature => specialFeature.Products);

            // Quan hệ Order - Coupon
            modelBuilder.Entity<Order>()
                .HasOne(order => order.Coupon)
                .WithMany(coupon => coupon.Orders)
                .HasForeignKey(order => order.CouponId);
            #endregion
        }
        public DbSet<Address> Addresss { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<CatalogAttribute> CatalogAttributes { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OS> OSs { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVersion> ProductVersions { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Provine> Provines { get; set; }
        public DbSet<SelectionValue> SelectionValues { get; set; }
        public DbSet<SpecialFeature> SpecialFeatures { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreProduct> StoreProducts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Ward> Wards { get; set; }
    }
}
