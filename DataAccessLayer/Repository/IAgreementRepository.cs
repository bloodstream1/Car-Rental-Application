using Car_Rental_Application.Models;
using System.Collections.Generic;

namespace Car_Rental_Application.Repository
{
    public interface IAgreementRepository
    {
        //public Car GetById(int id);
        //public Car Update(Car car);
        //public string Delete(int id);
        //public List<Car> GetAll();
        //public string InsertCartItem(string userMail, int duration);

        public Agreement GetById(int id);

        public Agreement Update(Agreement agreement);

        public string RemoveAgreement(string userMail, int agreementId);
        public List<AgreementWithCarDTO> GetAgreements(string userMail);
        public Agreement Add(Agreement agreement);
    }
}
