using Car_Rental_Application.Models;
using System.Collections.Generic;

namespace Car_Rental_Application.Services
{
    public interface IAgreementService
    {
        public Agreement GetById(int id);

        public Agreement update(Agreement agreement);

        public string RemoveAgreement(string userMail, int agreementId);
        public List<AgreementWithCarDTO> GetAgreements(string userMail);
        public Agreement Add(Agreement agreement);
    }
}
