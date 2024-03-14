import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';
import { CarService } from '../services/car.service';
import { AgreementService } from '../services/agreement.service';
import { Agreement, AgreementStatus, AgreementWithCarDTO, Car, AvailabilityStatus } from '../models/models';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css']
})
export class AgreementsComponent implements OnInit {
  token!: string | null;
  role = "User";
  agreements: any[] = [];
  errors: any[] = [];
  userMail!: string;

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private authService: AuthService,
    private agreementService: AgreementService,
    private carService: CarService) { }

  ngOnInit(): void {
    this.authService.getTokenChange().subscribe((token: string | null) => {
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.role = decodedToken.role;
      this.userMail = decodedToken.email;
      console.log("role", this.role);
    })
    this.loadAgreements();
  }

  loadAgreements() {
    this.agreementService.getAgreements(this.userMail).subscribe({
      next: response => {
        this.agreements = response;
        console.log('inside load Agreements', this.agreements);
      },
      error: (err) => { console.error(err) }
    });
  }

  deleteAgreement(agreementId: number) {
    this.agreementService.removeItem(this.userMail, agreementId).subscribe({
      next: response => {
        console.log("inside delete");
        this.loadAgreements();
      },
      error: err => console.error(err)
    })
  }

  editAgreement(id: number) {
    this.router.navigate(['agreements/edit-agreement/' + id]);
  }

  toggleAccept(agreementWithCarDTO: AgreementWithCarDTO, carId: number) {
    this.errors = [];
    const car: Car = {
      id: agreementWithCarDTO.carId,
      maker: agreementWithCarDTO.carMaker,
      model: agreementWithCarDTO.carModel,
      availabilityStatus: AvailabilityStatus.Booked,
      rentalPrice: agreementWithCarDTO.carRentalPrice,
    };
    console.log("inside toggle accept", car);
    this.carService.edit(car).subscribe({
      next: (response) => {
        console.log("inside toggle accept after call", response);
        this.updateAgreement(agreementWithCarDTO);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  toggleInspection(agreementWithCarDTO: AgreementWithCarDTO, carId: number) {
    this.errors = [];
    const car: Car = {
      id: agreementWithCarDTO.carId,
      maker: agreementWithCarDTO.carMaker,
      model: agreementWithCarDTO.carModel,
      availabilityStatus: AvailabilityStatus.UnderInspection,
      rentalPrice: agreementWithCarDTO.carRentalPrice,
    };
    console.log("inside toggle accept", car);
    this.carService.edit(car).subscribe({
      next: (response) => {
        console.log("inside toggle accept after call", response);
        this.updateAgreement(agreementWithCarDTO);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  toggleAcceptReturn(agreementWithCarDTO: AgreementWithCarDTO, carId: number) {
    this.errors = [];
    const car: Car = {
      id: agreementWithCarDTO.carId,
      maker: agreementWithCarDTO.carMaker,
      model: agreementWithCarDTO.carModel,
      availabilityStatus: AvailabilityStatus.Returned,
      rentalPrice: agreementWithCarDTO.carRentalPrice,
    };
    console.log("inside toggle accept", car);
    this.carService.edit(car).subscribe({
      next: (response) => {
        console.log("inside toggle accept after call", response);
        this.AgreementComplete(agreementWithCarDTO);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  AgreementComplete(agreementWithCarDTO: AgreementWithCarDTO)
  {
    this.errors = [];
    const updatedAgreement: Agreement = {
      id: agreementWithCarDTO.agreementId,
      rentalDuration: agreementWithCarDTO.rentalDuration,
      bookingDate: new Date(),
      totalCost: agreementWithCarDTO.totalCost,
      carId: agreementWithCarDTO.carId,
      userId: agreementWithCarDTO.userId,
      status: AgreementStatus.Completed,
    };
    console.log("inside update agreement before call", updatedAgreement)
    this.agreementService.edit(updatedAgreement).subscribe({
      next: (response) => {
        console.log("inside update agreement after call", response);
        this.loadAgreements();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateAgreement(agreementWithCarDTO: AgreementWithCarDTO)
  {
    this.errors = [];
    const updatedAgreement: Agreement = {
      id: agreementWithCarDTO.agreementId,
      rentalDuration: agreementWithCarDTO.rentalDuration,
      bookingDate: new Date(),
      totalCost: agreementWithCarDTO.totalCost,
      carId: agreementWithCarDTO.carId,
      userId: agreementWithCarDTO.userId,
      status: AgreementStatus.Accepted,
    };
    console.log("inside update agreement before call", updatedAgreement)
    this.agreementService.edit(updatedAgreement).subscribe({
      next: (response) => {
        console.log("inside update agreement after call", response);
        this.loadAgreements();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  toggleReturn(agreementWithCarDTO: AgreementWithCarDTO, carId: number) {
    this.errors = [];
    const car: Car = {
      id: agreementWithCarDTO.carId,
      maker: agreementWithCarDTO.carMaker,
      model: agreementWithCarDTO.carModel,
      availabilityStatus: AvailabilityStatus.RequestedForReturn,
      rentalPrice: agreementWithCarDTO.carRentalPrice,
    };
    console.log("inside toggle return", car);
    this.carService.edit(car).subscribe({
      next: (response) => {
        console.log("inside toggle return after call", response);
        this.loadAgreements();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
