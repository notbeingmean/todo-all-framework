using Microsoft.EntityFrameworkCore;

namespace dotnet_todo.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Todos> Todos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todos>()
                .Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100);


        }
    }
}