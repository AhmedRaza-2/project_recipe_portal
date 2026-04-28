using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecipeNest.Models
{
    public class Chef
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Name { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        public string? Specialty { get; set; }

        public string? Bio { get; set; }

        public string? ProfileImageUrl { get; set; }

        [Required]
        public required string Password { get; set; }

        public int Likes { get; set; } = 0;

        // Navigation property for Recipes
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
