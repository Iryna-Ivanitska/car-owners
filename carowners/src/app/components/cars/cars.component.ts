import { Component, Host, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, ControlContainer } from '@angular/forms';
import { CarInterface } from './../../interfaces/car.interface';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CarsComponent implements OnInit {
  public carsGroup: FormGroup | any;
  @Input() car!: CarInterface;
  @Input() action!: string;
  @Input() index!: number;
  // window[`carsGroup${this.index}`]: FormGroup | any;

  constructor(private fb: FormBuilder,
              @Host() private parentFor: FormGroupDirective) { }

  ngOnInit(): void {
    this.carsGroup = this.parentFor.form;
    console.log(this.car)
    this.carsGroup.addControl(`carsGroup${this.index}`, this.fb.group({
      hosnumber: [this.car.hosnumber, [Validators.required]],
      manufacturer: [this.car.manufacturer, [Validators.required]],
      model: [this.car.model, [Validators.required]],
      year: [this.car.year, [Validators.required]]
    }))
    if (this.action == 'view') {
      this.carsGroup.disable();
    }
  }

}
