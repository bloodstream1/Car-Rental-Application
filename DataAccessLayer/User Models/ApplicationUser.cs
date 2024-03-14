using Microsoft.AspNetCore.Identity;

namespace Car_Rental_Application.User_Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
