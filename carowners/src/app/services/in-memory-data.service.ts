import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { UserInterface } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb(): {} {
    return {
      users: [
        {
          id: 0,
          surname: 'Ivanov',
          name: 'Ivan',
          father: 'Ivanovych',
          cars: [
            { id: 0,
              hosnumber:  'AX1111HP',
              manufacturer: 'Peugeot',
              model: 'SW 307',
              year: '2000'
            },
            {
              id: 1,
              hosnumber:  'AO2222AE',
              manufacturer: 'Audi',
              model: 'Q7',
              year: '1998'
            }
          ]
        }
      ]
    }
  }
}
