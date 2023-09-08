using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;

namespace ASPWebAPI.Entities
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
            options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("LearnASPDB"));
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
                    e.UpdatedAt = DateTime.Now;
                }
            }
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
            // Product - Brand Relationship
            /*modelBuilder.Entity<Product>()
                .HasOne<Brand>(product => product.Brand)
                .WithMany(brand => brand.Products)
                .HasForeignKey<Product>(product => product.BrandId);*/

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
            #endregion

            #region Many to Many with extra column
            #endregion
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OS> OSs { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<SpecialFeature> SpecialFeatures { get; set; }
    }
}
