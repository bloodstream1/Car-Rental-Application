import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AvailabilityStatus, Car } from '../models/models';
import { CarService } from '../services/car.service';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  AddCarForm!: FormGroup;
  message = '';

  constructor(private fb: FormBuilder,
    private carService: CarService) { }

  ngOnInit(): void {
    this.AddCarForm = this.fb.group({
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
    });
  }

  addCar() {
    const newCar: Car = {
      id: 0,
      maker: this.AddCarForm.value.maker,
      model: this.AddCarForm.value.model,
      availabilityStatus: AvailabilityStatus.Available,
      rentalPrice: Number(this.AddCarForm.value.rentalPrice),
    };
    console.log(newCar);
    this.carService.Add(newCar).subscribe({
      next: (response) => {
        console.log(response);
        this.message = 'Car Added Successfully';
        this.AddCarForm.reset();
      },
      error: (err) => {
        console.error('Car not added', err);
        this.message = 'Car not added';
      }
    });
  }

  get Maker(): FormControl {
    return this.AddCarForm.get('maker') as FormControl;
  }
  get Model(): FormControl {
    return this.AddCarForm.get('model') as FormControl;
  }
  get RentalPrice(): FormControl {
    return this.AddCarForm.get('rentalPrice') as FormControl;
  }
}
