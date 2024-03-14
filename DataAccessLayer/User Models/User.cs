namespace Car_Rental_Application.User_Models
{
    public class User
    {
        public string UserName { get; set; } 
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; }
    }
}
