using Car_Rental_Application.EntityFrameworkDbContext;
using Car_Rental_Application.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Car_Rental_Application.Repository
{
    public class CarRepository : ICarRepository
    {
        private readonly CarRentalDbContext _context;
        public CarRepository(CarRentalDbContext context)
        {
            _context = context;
        }

        public Car GetById(int id)
        {
            try
            {
                return _context.Car.FirstOrDefault(p => p.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while fetching the Car by id: {0}", ex.Message);
                throw;
            }
        }

        public Car Update(Car product)
        {
            try
            {
                var updateCar = _context.Car.FirstOrDefault(p => p.Id == product.Id);
                if (updateCar != null)
                {
                    updateCar.Maker = product.Maker;
                    updateCar.Model = product.Model;
                    updateCar.RentalPrice = product.RentalPrice;
                    updateCar.AvailabilityStatus = product.AvailabilityStatus;
                    _context.SaveChanges();
                    Console.WriteLine("Inside Product repo: {0}", updateCar);
                }
                return updateCar;
            }
            catch(Exception ex)
            {
                Console.WriteLine("An error occured while updating the Car by id: {0}", ex.Message);
                throw;
            }
        }

        public string Delete(int id)
        {
            try
            {
                var carToDelete = _context.Car.FirstOrDefault(p => p.Id == id);
                if (carToDelete != null)
                {
                    _context.Car.Remove(carToDelete);
                    _context.SaveChanges();
                    return "Deleted";
                }
                return "Failed";
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return "Failed";
            }
        }

        public List<Car> GetAll()
        {
            try
            {
                return _context.Car.ToList();
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message); 
                throw;
            }
        }

        public Car Add(Car car)
        {
            try
            {
                _context.Car.Add(car);
                _context.SaveChanges();
                return car;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
