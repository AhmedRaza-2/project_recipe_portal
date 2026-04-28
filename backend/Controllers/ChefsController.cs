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
    public class ChefsController : ControllerBase
    {
        private readonly RecipeNestContext _context;

        public ChefsController(RecipeNestContext context)
        {
            _context = context;
        }

        // GET: api/Chefs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetChefs()
        {
            var chefs = await _context.Chefs.Include(c => c.Recipes).ToListAsync();
            return Ok(chefs.Select(c => new {
                c.Id,
                c.Name,
                c.Email,
                c.Specialty,
                c.Bio,
                c.ProfileImageUrl,
                c.Likes,
                RecipeCount = c.Recipes?.Count ?? 0
            }));
        }

        // GET: api/Chefs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetChef(int id)
        {
            var chef = await _context.Chefs.Include(c => c.Recipes).FirstOrDefaultAsync(c => c.Id == id);

            if (chef == null)
            {
                return NotFound();
            }

            return Ok(new {
                chef.Id,
                chef.Name,
                chef.Email,
                chef.Specialty,
                chef.Bio,
                chef.ProfileImageUrl,
                chef.Likes,
                Recipes = chef.Recipes?.Select(r => new {
                    r.Id,
                    r.Name,
                    r.Category,
                    r.TimeToPrepare,
                    r.Ingredients,
                    r.Instructions,
                    r.DateAdded,
                    r.IsDraft
                }).ToList()
            });
        }

        // POST: api/Chefs/5/like
        [HttpPost("{id}/like")]
        public async Task<ActionResult<int>> LikeChef(int id)
        {
            var chef = await _context.Chefs.FindAsync(id);
            if (chef == null)
            {
                return NotFound();
            }

            chef.Likes++;
            await _context.SaveChangesAsync();

            return Ok(chef.Likes);
        }

        // PUT: api/Chefs/5 (For Edit Profile)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChef(int id, Chef chef)
        {
            if (id != chef.Id)
            {
                return BadRequest();
            }

            _context.Entry(chef).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Chefs.Any(e => e.Id == id))
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
    }
}
