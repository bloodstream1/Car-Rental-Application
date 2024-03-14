using Car_Rental_Application.Models;
using System.Collections.Generic;

namespace Car_Rental_Application.Repository
{
    public interface ICarRepository
    {
        public Car GetById(int id);
        public Car Update(Car car);
        public string Delete(int id);
        public List<Car> GetAll();
        public Car Add(Car car);
    }
}
