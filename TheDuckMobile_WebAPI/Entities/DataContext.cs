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

            #endregion

            #region Many to Many with extra column
            #endregion
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<ProductVersion> ProductVersions { get; set; }
        public DbSet<Color> Colors { get; set; }
    }
}
