import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agreement, AgreementStatus, Car } from '../models/models';
import { AuthService } from '../services/auth.service';
import { AgreementService } from '../services/agreement.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent implements OnInit {
  BookCarForm!: FormGroup;
  message = '';
  carId!: number;
  car?: Car;
  errors: string[] = [];
  token!: string | null ;
  userEmail?: string|null;

  constructor(private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private agreementService: AgreementService) { }

  ngOnInit(): void {
    this.authService.getTokenChange().subscribe((token:string|null) =>{
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      console.log(decodedToken);
      this.userEmail = decodedToken.email;
    })
    this.carId = this.route.snapshot.params['id'];
    this.carService.getById(this.carId).subscribe({
      next: (response) => {
        this.car = response;
        console.log(this.car);
        if (this.car) {
          this.BookCarForm.patchValue({ ...this.car })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.BookCarForm = this.fb.group({
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

  BookCar() {
    this.errors = [];
    const newAgreement: Agreement = {
      id: 0,
      rentalDuration: Number(this.BookCarForm.value.duration),
      bookingDate: new Date(),
      totalCost: Number(this.BookCarForm.value.duration * this.BookCarForm.value.rentalPrice),
      carId: this.carId,
      userId: this.userEmail,
      status: AgreementStatus.Pending,
    };
    console.log(newAgreement);
    this.agreementService.Add(newAgreement).subscribe({
      next: (response) => {
        console.log(response);
        this.message = 'Agreement Generated!';
        this.BookCarForm.reset();
      },
      error: (err) => {
        console.error('Car not Booked', err);
        this.message = 'Car not Booked';
      }
    });
    // console.log("inside edit-car", car);
    // this.carService.edit(car).subscribe({
    //   next: (response) => {
    //     console.log("inside edit-car after call", response);
    //     this.BookCarForm.reset();
    //     this.router.navigate(['']);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }

  get Maker(): FormControl {
    return this.BookCarForm.get('maker') as FormControl;
  }
  get Model(): FormControl {
    return this.BookCarForm.get('model') as FormControl;
  }
  get RentalPrice(): FormControl {
    return this.BookCarForm.get('rentalPrice') as FormControl;
  }
  get AvailabilityStatus(): FormControl {
    return this.BookCarForm.get('availabilityStatus') as FormControl;
  }
  get Duration(): FormControl {
    return this.BookCarForm.get('duration') as FormControl;
  }
}
