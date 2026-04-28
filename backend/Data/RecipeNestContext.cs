using Microsoft.EntityFrameworkCore;
using RecipeNest.Models;

namespace RecipeNest.Data
{
    public class RecipeNestContext : DbContext
    {
        public RecipeNestContext(DbContextOptions<RecipeNestContext> options)
            : base(options)
        {
        }

        public DbSet<Chef> Chefs { get; set; }
        public DbSet<Recipe> Recipes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data or configure relationships if needed
            modelBuilder.Entity<Chef>()
                .HasMany(c => c.Recipes)
                .WithOne(r => r.Chef)
                .HasForeignKey(r => r.ChefId);
        }
    }
}
