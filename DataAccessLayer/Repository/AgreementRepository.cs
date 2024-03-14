using Car_Rental_Application.EntityFrameworkDbContext;
using Car_Rental_Application.Models;
using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Car_Rental_Application.Repository
{
    public class AgreementRepository : IAgreementRepository
    {
        private readonly CarRentalDbContext _context;
        public AgreementRepository(CarRentalDbContext context)
        {
            _context = context;
        }

        public Agreement GetById(int id)
        {
            try
            {
                return _context.Agreements.FirstOrDefault(a => a.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while fetching the Agreement by id: {0}",ex.Message);
                throw;
            }
        }

        public Agreement Update(Agreement agreement)
        {
            try
            {
                var updateAgreement = _context.Agreements.FirstOrDefault(a => a.Id == agreement.Id);
                if (updateAgreement != null)
                {
                    updateAgreement.CarId = agreement.CarId;
                    updateAgreement.BookingDate = agreement.BookingDate;
                    updateAgreement.RentalDuration = agreement.RentalDuration;
                    updateAgreement.TotalCost = agreement.TotalCost;
                    updateAgreement.Status = agreement.Status;
                    _context.SaveChanges();
                    Console.WriteLine("Inside Product repo: {0}", updateAgreement);
                }
                return updateAgreement;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while updating the Agreement by id: {0}",ex.Message);
                throw;
            }
        }

        public string RemoveAgreement(string userMail, int agreementId)
        {
            try
            {
                var agreement = _context.Agreements
                    .Where(a => a.Id == agreementId).FirstOrDefault();

                if(agreement == null)
                {
                    return "failure";
                }
                _context.Agreements.Remove(agreement);
                _context.SaveChanges();

                return "success";
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return "failure";
            }
        }

        public List<AgreementWithCarDTO> GetAgreements(string userMail)
        {
            try
            {
                var agreementWithCars = _context.Agreements
                    .Join(_context.Car,
                    agreement => agreement.CarId,
                    car => car.Id,
                    (agreement, car) => new AgreementWithCarDTO
                    {
                        AgreementId = agreement.Id,
                        CarId = agreement.CarId,
                        BookingDate = agreement.BookingDate,
                        RentalDuration = agreement.RentalDuration,
                        TotalCost = agreement.TotalCost,
                        UserId = agreement.UserId,
                        CarMaker = car.Maker,
                        CarModel = car.Model,
                        CarRentalPrice = car.RentalPrice,
                        CarAvailabilityStatus = car.AvailabilityStatus,
                        Status = agreement.Status,
                    });
                if(userMail == "admin@example.com")
                {
                    return agreementWithCars.ToList();
                }
                else
                {
                    var filterAgreements = agreementWithCars
                        .Where(agreement => agreement.UserId == userMail).ToList();
                    return filterAgreements;
                }          
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return new List<AgreementWithCarDTO>();
            }
        }

        public Agreement Add(Agreement agreement)
        {
            try
            {
                _context.Agreements.Add(agreement);
                _context.SaveChanges();
                return agreement;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
