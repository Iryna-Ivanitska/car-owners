import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserInterface } from './../interfaces/user.interface';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('/api/users')
    .pipe(
      catchError(this.handleError)
    )
  }

  addUser(user: UserInterface): Observable<any>{
    return this.http.put('/api/users', user, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(user: UserInterface) {
    return this.http.delete(`/api/users/?id=${user.id}`, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
