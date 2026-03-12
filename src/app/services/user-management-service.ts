import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
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
      if (!users.length) {
        throw new Error('No users found in database');
      }
      return users;
    }),
    catchError(() => throwError(() => new Error('Failed to fetch users from server'))
    )
  );
  }

  createUser(newUser: LoginModel): Observable<LoginModel>{
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${newUser.email}`)
      .pipe(switchMap(users => {
        if(users.length > 0){
          throw new Error('Account with this email already exist. Please enter another email.');
        }
        return this.http.post<LoginModel>(`${this.apiUrl}/users`,newUser);
      }))
  }

  deleteUser(userId: string): Observable<LoginModel>{
    return this.http.delete<LoginModel>(`${this.apiUrl}/users/${userId}`);
  }

  editUser(updatedProfile: LoginModel): Observable<LoginModel> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${updatedProfile.email}`)
      .pipe(switchMap(users => {
        const emailTaken = users.find(u => u.id !== updatedProfile.id);
        if(emailTaken){
          throw new Error('Account with this email already exist. Please enter another email.');
        }
        
        return this.http.patch<LoginModel>(`${this.apiUrl}/users/${updatedProfile.id}`, updatedProfile);
      }))
  }
}
