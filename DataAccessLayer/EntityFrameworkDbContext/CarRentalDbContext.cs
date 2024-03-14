using Car_Rental_Application.Models;
using Car_Rental_Application.User_Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Car_Rental_Application.EntityFrameworkDbContext
{
    public class CarRentalDbContext : IdentityDbContext<ApplicationUser>
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options)
            : base(options)
        {

        }
        public DbSet<Car> Car { get; set; }

        public DbSet<Agreement> Agreements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
            });

            modelBuilder.Entity<Car>()
                .Property(c => c.RentalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Agreement>()
               .Property(a => a.TotalCost)
               .HasColumnType("decimal(18,2)");
        }
    }
}
