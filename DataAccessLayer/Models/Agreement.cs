using Car_Rental_Application.User_Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Car_Rental_Application.Models
{
    public class Agreement
    {
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }

        [Required]
        public int RentalDuration { get; set; }

        [Required]
        public decimal TotalCost { get; set; }

        [Required]
        public string UserId { get; set; }

        public AgreementStatus Status { get; set; }

        //[Required]
        //[ForeignKey("CarId")]
        //public Car Car { get; set; }
    }

    public enum AgreementStatus
    {
        Pending,
        Accepted,
        Completed
    }
}
