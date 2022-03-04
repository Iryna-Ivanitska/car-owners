import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
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
    return this.http.post('/api/users', user, cudOptions).pipe(
      tap(_ => console.log(`added user id=${user.id}`)),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserInterface): Observable<any> {
    return this.http.put(`/api/users`, user, cudOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError)
    );
  }

  deleteUser(user: UserInterface) {
    return this.http.delete(`/api/users/${user.id}`, cudOptions).pipe(
      tap(_ => console.log(`deleted user id=${user.id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
