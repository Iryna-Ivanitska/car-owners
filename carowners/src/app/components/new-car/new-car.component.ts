import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarInterface } from './../../interfaces/car.interface';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from './../../interfaces/user.interface';
import { Car } from 'src/app/model/car.model';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss']
})
export class NewCarComponent implements OnInit {
  @Input() action!: string;
  @Input() data!: any;
  public newCarForm: FormGroup | any;
  public isNewRow = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCarForm = this.fb.group({
      hosnumber: ['', [Validators.required, Validators.pattern('[A-Z]{2}\\d{4}[A-Z]{2}')]],
      manufacturer: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1990), Validators.max(2022), Validators.pattern("^[0-9]*$")]]
    });
  }

  addRow() {
    this.isNewRow = true;
  }

  addCar() {
    if (this.newCarForm.invalid) return;
    let cars: string[] = [];
    this.data.owners.forEach( (user: UserInterface) => {
      user.cars.forEach((car: CarInterface) => {
        cars.push(car.hosnumber);
      })
    });
    if (cars.includes(this.newCarForm.value.hosnumber)) {
      alert('Такой автомобиль уже есть');
      return;
    }
    let car = {
      id: this.data.cars && this.data.cars.length > 0 ? Math.max(...this.data.cars.map((user: any) => user.id)) + 1 : 0,
      hosnumber: this.newCarForm.value.hosnumber,
      manufacturer: this.newCarForm.value.manufacturer,
      model: this.newCarForm.value.model,
      year: this.newCarForm.value.year,
    }
    this.data.cars.push(car);
    cars.push(car.hosnumber);
    this.newCarForm.reset();
    this.isNewRow = false;
  }
}
