using Car_Rental_Application.Models;
using Car_Rental_Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Car_Rental_Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            try
            {
                var car = _carService.GetById(id);
                return Ok(car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the car by id");
            }
        }

        [HttpPut]
        public ActionResult<Car> Update(Car car)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var res = _carService.update(car);
                    return Ok(res);
                }
                catch(Exception ex) 
                {
                    return StatusCode(500, "An error occurred while updating the car");
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var res = _carService.delete(id);
            if (res == "Failed")
            {
                return NotFound("Product not found");
            }
            return Ok(new { message = "deleted" });
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<Car>> Get()
        {
            try
            {
                var cars = _carService.GetAll();
                return Ok(cars);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the cars data");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Car> Create(Car car)
        {
            Console.WriteLine(car);
            if (ModelState.IsValid)
            {
                try
                {
                    var res = _carService.Add(car);
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "An error occurred while adding the car");
                }
            }
            return BadRequest("invalid car data");
        }
    }
}
