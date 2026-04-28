using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RecipeNestContext _context;

        public AuthController(RecipeNestContext context)
        {
            _context = context;
        }

        // POST: api/Auth/Register
        [HttpPost("register")]
        public async Task<ActionResult<Chef>> Register(Chef chef)
        {
            if (await _context.Chefs.AnyAsync(c => c.Email == chef.Email))
            {
                return BadRequest("Email already registered.");
            }

            _context.Chefs.Add(chef);
            await _context.SaveChangesAsync();

            return Ok(chef);
        }

        // POST: api/Auth/Login
        [HttpPost("login")]
        public async Task<ActionResult<Chef>> Login([FromBody] LoginDto loginDto)
        {
            var chef = await _context.Chefs.FirstOrDefaultAsync(c => c.Email == loginDto.Email && c.Password == loginDto.Password);

            if (chef == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(chef);
        }
    }

    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
