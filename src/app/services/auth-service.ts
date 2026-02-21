import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, find, map, Observable, throwError } from 'rxjs';
import { LoginModel } from '../login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  login(email: string, password: string): Observable<LoginModel> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(map(users => {
      if(!users.length){
        throw new Error('Invalid credentials');
      }
      return users[0];
    }))
  }
  createNewUser() {

  }

  resetPassword() {
    
  }
}
