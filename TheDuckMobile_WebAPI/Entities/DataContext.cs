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
            options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("TheDuckMobile"));
        }



        public override int SaveChanges()
        {
            TrackDate();
            return base.SaveChanges();
        }

        private void TrackDate()
        {
            foreach (var entityEntry in ChangeTracker.Entries())
            {
                if (entityEntry.Entity is User e
                    && entityEntry.State != EntityState.Added)
                {
                    //e.UpdatedAt = DateTime.Now;
                }
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region One to One
            // User - Account Relationship
            modelBuilder.Entity<User>()
                .HasOne<Account>(u => u.Account)
                .WithOne(acc => acc.User)
                .HasForeignKey<Account>(account => account.UserId);

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

            //Quan hệ address - district
            modelBuilder.Entity<Address>()
                .HasOne(address => address.District)
                .WithMany(district => district.Addresses)
                .HasForeignKey(address => address.DistrictId)
                .OnDelete(DeleteBehavior.Restrict);

            //Quan hệ address - provine
            modelBuilder.Entity<Address>()
                .HasOne(address => address.Provine)
                .WithMany(provine => provine.Addresses)
                .HasForeignKey(address => address.ProvineId)
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

            // Order - Address Relationship
            modelBuilder.Entity<Order>()
                .HasOne(order => order.Address)
                .WithMany(address => address.Orders)
                .HasForeignKey(order => order.AddressId);

            // Color - Product Relationship
            modelBuilder.Entity<Color>()
                .HasOne(color => color.Product)
                .WithMany(product => product.Colors)
                .HasForeignKey(color => color.ProductId);



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
            // Vote - Customer Relationship
            modelBuilder.Entity<Vote>()
                .HasOne<Customer>(vote => vote.Customer)
                .WithMany(customer => customer.Votes)
                .HasForeignKey(vote => vote.CustomerId);

            // Promotion - ProductVersion Relationship
            modelBuilder.Entity<ProductVersion>()
                .HasOne<Promotion>(productVersion => productVersion.Promotion)
                .WithMany(promotion => promotion.ProductVersions)
                .HasForeignKey(productVersion => productVersion.PromotionId);

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
            #endregion
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Address> Addresss { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Laptop> Laptops { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OS> OSs { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVersion> ProductVersions { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Provine> Provines { get; set; }
        public DbSet<SmartWatch> SmartWatches { get; set; }
        public DbSet<SpecialFeature> SpecialFeatures { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreProduct> StoreProducts { get; set; }
        public DbSet<Tablet> Tablets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
    }
}
