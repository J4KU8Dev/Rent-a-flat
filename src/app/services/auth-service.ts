import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, switchMap, tap, throwError } from 'rxjs';
import { LoginModel } from '../login-model';
import { PopUp } from '../pop-up/pop-up';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(){
    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
      const user = JSON.parse(loggedUser);
      this._currentUser.set(user);
    }
  }
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  popUpService = inject(PopUp);
  router = inject(Router);
  private _currentUser = signal<LoginModel | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  login(email: string, password: string): Observable<LoginModel> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${email}`).pipe(map(users => {
      if(!users.length){
        throw new Error('Account with this email does not exist. Please create an account.');
      }
      const user = users[0];
      if(user.password !== password){
        throw new Error('Incorrect password. Please try again.');
      }
      this._currentUser.set(user);
      localStorage.setItem('user',JSON.stringify(user));
      return user;
    }))
  }
  logOut() {
    this._currentUser.set(null);
    localStorage.removeItem('user');
    this.popUpService.showSuccess("You have been loged out !","Log out Successsful");
  }

  changePassword(oldPassword: string, newPassword: string) {
    const user = this.currentUser();
    if(!user){
      return throwError(() => new Error("User is not logged."));
    }
    if(user.password !== oldPassword){
      return throwError(() => new Error("Actual Password is incorrect."))
    }
    return this.http.patch<LoginModel>(`${this.apiUrl}/users/${this.currentUser()?.id}`, {
      password: newPassword,
    }).pipe(tap(updatedUser => {
      this._currentUser.set(updatedUser);
    }))
  }

  resetPassword(userId: string, newPassword: string) {
  return this.http.patch(`${this.apiUrl}/users/${userId}`, {
    password: newPassword,
  })
}


  createNewUser(newUser: LoginModel): Observable<LoginModel>{
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${newUser.email}`)
    .pipe(switchMap(users => {
      if(users.length > 0){
        throw new Error('Account with this email already exist. Please enter another email.');
      }
      return this.http.post<LoginModel>(`${this.apiUrl}/users`,newUser);
    }))
  }

  onCreateUniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
  
  onCheckEmail(email: string): Observable<LoginModel> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${email}`)
    .pipe(map(users => {
      if(users.length === 0){
        throw new Error('Account with entered email does not exist');
      }
    return users[0]
    }))
  }

}
