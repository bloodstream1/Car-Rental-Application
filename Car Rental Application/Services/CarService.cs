using Car_Rental_Application.Models;
using Car_Rental_Application.Repository;
using System;
using System.Collections.Generic;

namespace Car_Rental_Application.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        public CarService(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        public Car GetById(int id)
        {
            return _carRepository.GetById(id);
        }

        public Car update(Car car)
        {
            var editedCar = new Car()
            {
                Id = car.Id,
                Maker = car.Maker,
                Model = car.Model,
                RentalPrice = car.RentalPrice,
                AvailabilityStatus = car.AvailabilityStatus,
            };
            return _carRepository.Update(editedCar);
        }

        public string delete(int id)
        {
            return _carRepository.Delete(id);
        }

        public List<Car> GetAll()
        {
            return _carRepository.GetAll();
        }

        public Car Add(Car car)
        {
            var newCar = new Car()
            {
                Maker = car.Maker,
                Model = car.Model,
                RentalPrice = car.RentalPrice,
                AvailabilityStatus = car.AvailabilityStatus,
            };
            return _carRepository.Add(newCar);
        }
    }
}
