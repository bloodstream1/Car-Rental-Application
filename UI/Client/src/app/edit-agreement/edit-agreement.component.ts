import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgreementService } from '../services/agreement.service';
import { Agreement, AgreementStatus, Car } from '../models/models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-agreement',
  templateUrl: './edit-agreement.component.html',
  styleUrls: ['./edit-agreement.component.css']
})
export class EditAgreementComponent implements OnInit {
  EditAgreementForm!: FormGroup;
  message = '';
  errors: string[] = [];
  id!: number;
  agreementId!: number;
  carId!: number;
  car?: Car;
  agreement?: Agreement;
  token!: string | null ;
  userEmail?: string|null;

  constructor(private fb: FormBuilder,
    private carService: CarService,
    private agreementService: AgreementService,
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getTokenChange().subscribe((token:string|null) =>{
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      console.log(decodedToken);
      this.userEmail = decodedToken.email;
    });
    this.agreementId = this.route.snapshot.params['id'];
    this.agreementService.getById(this.agreementId).subscribe({
      next: (response) => {
        this.agreement = response;
        this.carId = this.agreement.carId;
        console.log('ye agreement h',this.agreement);
        this.getCarDetails(this.agreement.carId);
        if (this.agreement) {
          this.EditAgreementForm.patchValue({ 
            duration: this.agreement.rentalDuration,
           })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.EditAgreementForm = this.fb.group({
      maker:
        [
          '',
          [
            Validators.required,
          ]
        ],
      model:
        [
          '',
          [
            Validators.required,
          ]
        ],
      rentalPrice:
        [
          '',
          [
            Validators.required,
            Validators.min(1),
          ]
        ],
      availabilityStatus:
        [
          '',
          [
            Validators.required,
          ]
        ],
      duration:
        [
          '',
          [
            Validators.required,
            Validators.min(1),
          ]
        ],
    });
  }

  editAgreement() {
    this.errors = [];
    const updatedAgreement: Agreement = {
      id: this.agreementId,
      rentalDuration: Number(this.EditAgreementForm.value.duration),
      bookingDate: new Date(),
      totalCost: Number(this.EditAgreementForm.value.duration * this.EditAgreementForm.value.rentalPrice),
      carId: this.carId,
      userId: this.userEmail,
      status: AgreementStatus.Pending,
    };
    console.log("inside edit-agreement", updatedAgreement);
    this.agreementService.edit(updatedAgreement).subscribe({
      next: (response) => {
        console.log("inside edit-agreement after call", response);
        this.EditAgreementForm.reset();
        this.router.navigate(['/agreements']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  // console.log('ye car h',this.car);
  getCarDetails(carId:number)
  {
    this.carService.getById(carId).subscribe({
      next: (response) => {
        this.car = response;
        if (this.car) {
          this.EditAgreementForm.patchValue({ ...this.car })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get Maker(): FormControl {
    return this.EditAgreementForm.get('maker') as FormControl;
  }
  get Model(): FormControl {
    return this.EditAgreementForm.get('model') as FormControl;
  }
  get RentalPrice(): FormControl {
    return this.EditAgreementForm.get('rentalPrice') as FormControl;
  }
  get AvailabilityStatus(): FormControl {
    return this.EditAgreementForm.get('availabilityStatus') as FormControl;
  }
  get Duration(): FormControl {
    return this.EditAgreementForm.get('duration') as FormControl;
  }
}
