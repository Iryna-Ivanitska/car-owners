import { Component, OnInit, Input } from '@angular/core';
import { CarInterface } from './../../interfaces/car.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  @Input() cars!: CarInterface[];
  public newCarForm: FormGroup | any;

  constructor() { }

  ngOnInit(): void {
  }

  addCar() {
    let car = {
      
    }
  }
}
