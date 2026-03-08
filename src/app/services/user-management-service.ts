import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../login-model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  getAllUsers(): Observable<LoginModel[]> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users`);
  }

  addUser(newUser: LoginModel): Observable<LoginModel>{
    return this.http.post<LoginModel>(`${this.apiUrl}/users`,newUser);
  }

  deleteUser() {
    // this.http.delete
  }

  editUser() {
    
  }
  // add error handling
}
