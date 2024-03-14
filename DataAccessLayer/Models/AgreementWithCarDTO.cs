using System;

namespace Car_Rental_Application.Models
{
    public class AgreementWithCarDTO
    {
        public int AgreementId { get; set; }
        public int CarId { get; set; }
        public DateTime BookingDate { get; set; }
        public int RentalDuration { get; set; }
        public decimal TotalCost { get; set; }
        public string UserId { get; set; }

        public string CarMaker { get; set; }
        public string CarModel { get; set; }
        public decimal CarRentalPrice { get; set; }
        public AvailabilityStatus CarAvailabilityStatus { get; set; }
        public AgreementStatus Status { get; set; }
    }
}
