import { UserInterface } from './../interfaces/user.interface';
import { CarInterface } from './../interfaces/car.interface';

export class User implements UserInterface {
    id: number | null;
    surname: string;
    name: string;
    father: string;
    cars: CarInterface[];

    constructor(id: number | null, surname: string, name: string, father: string) {
      this.id = null;
      this.surname = surname;
      this.name = name;
      this.father = father;
      this.cars = [];
    }
}
