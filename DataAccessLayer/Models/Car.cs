using System.ComponentModel.DataAnnotations;

namespace Car_Rental_Application.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Maker is a required field.")]
        [MaxLength(50, ErrorMessage = "Maximum 50 Characters allowed.")]
        public string Maker { get; set; }

        [Required(ErrorMessage = "Model is a required field.")]
        [MaxLength(100, ErrorMessage = "Maximum 100 Characters allowed.")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Rental Price is a required field.")]
        public decimal RentalPrice { get; set; }

        [Required(ErrorMessage = "Availability Status is a required field.")]
        public AvailabilityStatus AvailabilityStatus { get; set; }
    }
    public enum AvailabilityStatus
    {
        Available,
        Unavailable,
        UnderInspection,
        Booked,
        RequestedForReturn,
        Returned
    }
}
