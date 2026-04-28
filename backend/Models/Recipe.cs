using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeNest.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public required string Name { get; set; }

        [Required]
        public required string Category { get; set; }

        [Required]
        public required string Ingredients { get; set; }

        [Required]
        public required string Instructions { get; set; }

        public string? TimeToPrepare { get; set; }

        public DateTime DateAdded { get; set; } = DateTime.Now;

        public bool IsDraft { get; set; } = false;

        // Foreign Key
        public int ChefId { get; set; }

        [ForeignKey("ChefId")]
        public Chef? Chef { get; set; }
    }
}
