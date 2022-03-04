import { CarInterface } from './car.interface';

export interface UserInterface {
  id: number | null;
  surname: string;
  name: string;
  father: string;
  cars: CarInterface[];
}
