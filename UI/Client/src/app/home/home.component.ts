import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CarService } from '../services/car.service';
import { UtilityService } from '../services/utility.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  makers: string[] = [];
  models: string[] = [];
  cars: any[] = [];
  allCars: any[] = [];
  searchedCars: any[] = []
  errors: any[] = [];
  token!: string | null;
  role = "User";
  priceRanges: string[] = [];

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private authService: AuthService,
    private carService: CarService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCars();
    this.authService.getTokenChange().subscribe((token: string | null) => {
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.role = decodedToken.role;
      console.log("role", this.role);
    });
    this.searchForm = this.fb.group({
      maker: '',
      model: '',
      priceRange: '',
    });
    console.log("ye cars hai", this.cars);
  }

  loadCars() {
    this.carService.getAll().subscribe({
      next: response => {
        this.cars = response;
        this.allCars = response
        console.log(this.cars);
        this.makers = this.getUniqueMakers(this.cars);
        console.log("ye makers hai", this.makers);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

  getAvailabilityLabel(status: number): string {
    switch (status) {
      case 0:
        return 'Available';
      case 1:
        return 'Unavailable';
      case 2:
        return 'Under Inspection';
      case 3:
        return 'Booked';
      case 4:
        return 'Requested for Return';
      case 5:
        return 'Available'
      default:
        return 'Unknown';
    }
  }

  editCar(id: number) {
    this.router.navigate(['car/edit-car/' + id]);
  }

  bookCar(id: number) {
    this.router.navigate(['car/book-car/' + id]);
  }

  deleteCar(id: number) {
    this.carService.delete(id).subscribe({
      next: response => {
        this.cars = this.cars.filter(car => car.id !== id);
        console.log("inside deleteCar: ", this.cars);
      },
      error: err => console.log(err)
    });
  }

  onMakerChange() {
    console.log("inside on maker change");
    const selectedMaker = this.searchForm.get('maker')?.value;
    console.log(selectedMaker);
    this.models = this.getUniqueModelsForMakers(selectedMaker);
  }

  getUniqueMakers(cars: any[]): string[] {
    return Array.from(new Set(cars.map((car) => car.maker)));
  }

  onModelChange() {
    console.log("inside on model change");
    const selectedMaker = this.searchForm.get('maker')?.value;
    const selectedModel = this.searchForm.get('model')?.value;
    this.updatePriceRanges(selectedMaker, selectedModel);
  }

  getUniqueModelsForMakers(selectedMaker: string): string[] {
    console.log("inside get unique models for makers", selectedMaker);
    this.cars = this.allCars;
    const filteredCars = this.cars.filter((car) => car.maker === selectedMaker);
    console.log("inside get unique models for makers filter cars", filteredCars);
    const uniqueModels = Array.from(new Set(filteredCars.map((car) => car.model)));
    return uniqueModels;
  }

  onPriceChange() {
    console.log('inside on price change');
    const selectedMaker = this.searchForm.get('maker')?.value;
    const selectedModel = this.searchForm.get('model')?.value;
    const selectedPriceRange = this.searchForm.get('priceRange')?.value;
    console.log("yepricerange h", selectedPriceRange);
    if (selectedPriceRange && selectedModel && selectedPriceRange) {
      console.log("selected");
      this.showFilterResults(selectedMaker, selectedModel, selectedPriceRange);
    }
    else {
      this.cars = this.allCars;
    }
  }

  updatePriceRanges(selectedmaker: string, selectedmodel: string) {
    // console.log("inside update ranges");
    const filteredCars = this.cars.filter((car) => car.maker === selectedmaker && car.model === selectedmodel);
    // console.log(filteredCars);
    const minPrice = Math.min(...filteredCars.map((car) => car.rentalPrice));
    const maxPrice = Math.max(...filteredCars.map((car) => car.rentalPrice), 0);
    // console.log(minPrice, maxPrice);

    this.priceRanges = this.generatePriceRanges(minPrice, maxPrice, filteredCars);
  }

  generatePriceRanges(minPrice: number, maxPrice: number, filteredCars: any[]): string[] {
    // console.log(minPrice, maxPrice);
    const increment = 500;
    const priceRanges: string[] = [];
    for (let start = minPrice; start <= maxPrice; start += increment) {
      const startRange = Math.floor(start / 500) * 500;
      const endRange = startRange + 499;
      let carFound = false;
      // console.log(startRange, endRange);
      for (const car of filteredCars) {
        if (car.rentalPrice >= startRange && car.rentalPrice <= endRange) {
          carFound = true;
          break;
        }
      }
      if (carFound) {
        priceRanges.push(`${startRange}-${endRange}`);
      }
    }
    return priceRanges;
  }

  showFilterResults(selectedmaker: string, selectedmodel: string, selectedPriceRange: string) {

    this.cars = this.cars.filter((car) => {
      if (selectedmaker && car.maker !== selectedmaker) {
        return false;
      }
      if (selectedmodel && car.model !== selectedmodel) {
        return false;
      }
      if (selectedPriceRange) {
        const [selectedMinPrice, selectedMaxPrice] = selectedPriceRange.split('-');
        const price = car.rentalPrice;
        if (price < +selectedMinPrice || price > +selectedMaxPrice) {
          return false;
        }
      }
      return true;
    });
  }
}
