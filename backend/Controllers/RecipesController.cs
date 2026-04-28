using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeNestContext _context;

        public RecipesController(RecipeNestContext context)
        {
            _context = context;
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetRecipes()
        {
            var recipes = await _context.Recipes.Include(r => r.Chef).ToListAsync();
            return Ok(recipes.Select(r => new {
                r.Id,
                r.Name,
                r.Category,
                r.TimeToPrepare,
                r.Ingredients,
                r.Instructions,
                r.DateAdded,
                r.ChefId,
                ChefName = r.Chef?.Name
            }));
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetRecipe(int id)
        {
            var r = await _context.Recipes.Include(recipe => recipe.Chef).FirstOrDefaultAsync(recipe => recipe.Id == id);

            if (r == null)
            {
                return NotFound();
            }

            return Ok(new {
                r.Id,
                r.Name,
                r.Category,
                r.TimeToPrepare,
                r.Ingredients,
                r.Instructions,
                r.DateAdded,
                r.ChefId,
                ChefName = r.Chef?.Name
            });
        }

        // POST: api/Recipes
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        // PUT: api/Recipes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
