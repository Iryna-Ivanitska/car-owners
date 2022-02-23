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
          cars: []
        }
      ]
    }
  }
}
