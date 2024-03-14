using Car_Rental_Application.Models;
using Car_Rental_Application.Repository;
using System;
using System.Collections.Generic;

namespace Car_Rental_Application.Services
{
    public class AgreementService : IAgreementService
    {
        private readonly IAgreementRepository _agreementRepository;
        public AgreementService(IAgreementRepository agreementRepository)
        {
            _agreementRepository = agreementRepository;
        }

        public Agreement GetById(int id)
        {

            return _agreementRepository.GetById(id);
        }

        public Agreement update(Agreement agreement)
        {
            var editedAgreement = new Agreement()
            {
                Id = agreement.Id,
                CarId = agreement.CarId,
                BookingDate = DateTime.Now,
                RentalDuration = agreement.RentalDuration,
                TotalCost = agreement.TotalCost,
                UserId = agreement.UserId,
                Status = agreement.Status,
            };
            return _agreementRepository.Update(editedAgreement);
        }

        public string RemoveAgreement(string userMail, int agreementId)
        {
            return _agreementRepository.RemoveAgreement(userMail, agreementId);
        }

        public List<AgreementWithCarDTO> GetAgreements(string userMail)
        {
            return _agreementRepository.GetAgreements(userMail);
        }

        public Agreement Add(Agreement agreement)
        {
            var newAgreement = new Agreement()
            {
                CarId = agreement.CarId,
                UserId = agreement.UserId,
                RentalDuration = agreement.RentalDuration,
                BookingDate = agreement.BookingDate,
                TotalCost = agreement.TotalCost,
            };
            return _agreementRepository.Add(newAgreement);
        }
    }
}
