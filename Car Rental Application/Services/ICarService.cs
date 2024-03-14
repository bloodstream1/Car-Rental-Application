using Car_Rental_Application.Models;
using System.Collections.Generic;

namespace Car_Rental_Application.Services
{
    public interface ICarService
    {
        public Car GetById(int id);
        public Car update(Car car);
        public string delete(int id);
        public List<Car> GetAll();
        public Car Add(Car car);
    }
}
