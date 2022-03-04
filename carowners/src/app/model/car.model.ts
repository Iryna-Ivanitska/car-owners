import { CarInterface } from '../interfaces/car.interface';

export class Car implements CarInterface {
  id: number;
  hosnumber: string;
  manufacturer: string;
  model: string;
  year: number;

    constructor(id: number, hosnumber: string, manufacturer: string,  model: string, year: number) {
      this.id = id;
      this.hosnumber = hosnumber;
      this.manufacturer = manufacturer;
      this.model = model;
      this.year = year;
    }
}
