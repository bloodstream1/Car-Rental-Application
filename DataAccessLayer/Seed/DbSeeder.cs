using Car_Rental_Application.User_Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Car_Rental_Application.Seed
{
    public class DbSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DbSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedUsers()
        {
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await _roleManager.RoleExistsAsync("RegularUser"))
            {
                await _roleManager.CreateAsync(new IdentityRole("RegularUser"));
            }
            var regularUsers = new List<ApplicationUser>
            {
                new ApplicationUser
                {
                    UserName = "user1@example.com",
                    Email = "user1@example.com",
                },
                new ApplicationUser
                {
                    UserName = "user2@example.com",
                    Email = "user2@example.com",
                },
            };
            foreach (var user in regularUsers)
            {
                var currentuser = await _userManager.FindByNameAsync(user.Email);
                if (currentuser == null)
                {
                    var result = await _userManager.CreateAsync(user, "User123!");
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(user, "RegularUser");
                    }
                }
            }
            if(await _userManager.FindByEmailAsync("admin@example.com") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "admin@example.com",
                    Email = "admin@example.com",
                };
                var result = await _userManager.CreateAsync(user, "Admin123!");
                if(result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}
