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
            //foreach (var entityEntry in ChangeTracker.Entries())
            //{
            //    if (entityEntry.Entity is User e
            //        && entityEntry.State != EntityState.Added)
            //    {
            //        e.UpdatedAt = DateTime.Now;
            //    }
            //}
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region One to One
            modelBuilder.Entity<User>()
                .HasOne<Account>(u => u.Account)
                .WithOne(acc => acc.User)
                .HasForeignKey<Account>(account => account.UserId);
            #endregion

            #region Primary Key 
            #endregion


            #region One to Many
            modelBuilder.Entity<OrderItem>()
                .HasOne<Order>(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

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

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<ProductVersion> ProductVersions { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OS> OSs { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<SpecialFeature> SpecialFeatures { get; set; }
    }
}
