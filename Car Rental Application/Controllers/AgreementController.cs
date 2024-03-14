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
    public class AgreementController : ControllerBase
    {
        private readonly IAgreementService _agreementService;
        public AgreementController(IAgreementService agreementService)
        {
            _agreementService = agreementService;
        }

        [HttpGet("GetById/{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            try
            {
                var agreement = _agreementService.GetById(id);
                return Ok(agreement);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the agreement by id");
            }
        }

        [HttpPut]
        public ActionResult<Agreement> Update(Agreement agreement)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var res = _agreementService.update(agreement);
                    return Ok(res);
                }
                catch(Exception ex)
                {
                    return StatusCode(500, "An error occurred while updating the agreements data");
                }
            }
            return BadRequest("invalid agreement data");
        }

        [HttpDelete("{userMail}/{agreementId}")]
        public IActionResult RemoveAgreement(string userMail, int agreementId)
        {
            var res = _agreementService.RemoveAgreement(userMail, agreementId);
            if (res == "failed")
            {
                return BadRequest(new { message = "Item removal failed" });
            }
            return Ok(new { message = "Removal successful" });
        }

        [HttpGet("{userMail}")]
        public ActionResult<List<AgreementWithCarDTO>> GetAgreements(string userMail)
        {
            try
            {
                var res = _agreementService.GetAgreements(userMail);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching the agreements data");
            }
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public ActionResult<Agreement> Create(Agreement agreement)
        {
            Console.WriteLine(agreement);
            if (ModelState.IsValid)
            {
                try
                {
                    var res = _agreementService.Add(agreement);
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "An error occurred while adding the agreement");
                }
            }
            return BadRequest("invalid car data");
        }
    }
}
