import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, ControlContainer } from '@angular/forms';
import { Subject } from 'rxjs';
import { CarInterface } from './../../interfaces/car.interface';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CarsComponent implements OnInit, OnDestroy {
  public carsGroup: FormGroup | any;
  @Input() car!: CarInterface;
  @Input() data!: any;
  @Input() index!: number;
  private unsubscribe = new Subject<void>()

  constructor(private fb: FormBuilder,
              @Host() private parentFor: FormGroupDirective,
              ) { }

  ngOnInit(): void {
    this.carsGroup = this.parentFor.form;
    this.carsGroup.addControl(`carsGroup${this.index}`, this.fb.group({
      hosnumber: [this.car.hosnumber, [Validators.required, Validators.pattern('[A-Z]{2}\\d{4}[A-Z]{2}')]],
      manufacturer: [this.car.manufacturer, [Validators.required]],
      model: [this.car.model, [Validators.required]],
      year: [this.car.year, [Validators.required, Validators.min(1990), Validators.max(2022), Validators.pattern("^[0-9]*$")]]
    }))
    this.carsGroup.controls[`carsGroup${this.index}`].disable();
    if (this.data.action == 'view') {
      this.carsGroup.disable();
    }
  }

  deleteCar(id: number) {
    this.data.cars = this.data.cars.filter((car: CarInterface) => car.id != id)
  }

  ngOnDestroy(): void {
      this.unsubscribe.next();
  }
}
