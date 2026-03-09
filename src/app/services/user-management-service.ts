import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginModel } from '../login-model';
import { Login } from '../auth/login/login';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  getAllUsers(): Observable<LoginModel[]> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users`)
    .pipe(map(users => {
      if(users.length == 0){
        throw new Error('Returned 0 users. Please restart database');
      }
      return users;
    }))
  }

  createUser(newUser: LoginModel): Observable<LoginModel>{
    return this.http.post<LoginModel>(`${this.apiUrl}/users`,newUser);
  }

  deleteUser(userId: string) {
    return this.http.delete<LoginModel>(`${this.apiUrl}/users/${userId}`);
  }

  editUser() {
    
  }
  // add error handling
}
