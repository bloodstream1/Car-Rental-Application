import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  EditCarForm!: FormGroup;
  message = '';
  errors: string[] = [];
  id!: number;
  car?: Car;

  constructor(private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute) { }
  // this.initializeForm(); }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.carService.getById(this.id).subscribe({
      next: (response) => {
        this.car = response;
        console.log('inside book car ngit',this.car);
        if (this.car) {
          this.EditCarForm.patchValue({ ...this.car })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.EditCarForm = this.fb.group({
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
    });
  }

  // ValidateAvailabilityStatus(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const status = control.value;
  //     if (status === '0' || status === '1' || status === '2') {
  //       return null;
  //     }
  //     else {
  //       return { 'invalidAvailabilityStatus': true };
  //     }
  //   }
  // }

  editCar() {
    this.errors = [];
    const car: Car = {
      id: this.id,
      maker: this.EditCarForm.value.maker,
      model: this.EditCarForm.value.model,
      availabilityStatus: Number(this.EditCarForm.value.availabilityStatus),
      rentalPrice: Number(this.EditCarForm.value.rentalPrice),
    };
    console.log("inside edit-car", car);
    this.carService.edit(car).subscribe({
      next: (response) => {
        console.log("inside edit-car after call", response);
        this.EditCarForm.reset();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  get Maker(): FormControl {
    return this.EditCarForm.get('maker') as FormControl;
  }
  get Model(): FormControl {
    return this.EditCarForm.get('model') as FormControl;
  }
  get RentalPrice(): FormControl {
    return this.EditCarForm.get('rentalPrice') as FormControl;
  }
  get AvailabilityStatus(): FormControl {
    return this.EditCarForm.get('availabilityStatus') as FormControl;
  }
}
