import { CarInterface } from './car.interface';

export interface UserInterface {
  id: number;
  surname: string;
  name: string;
  father: string;
  cars: CarInterface[];
}
