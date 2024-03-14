using System.ComponentModel.DataAnnotations;

namespace Car_Rental_Application.User_Models
{
    public class LoginUser
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
