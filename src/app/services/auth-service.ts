import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginModel } from '../login-model';
import { PopUp } from '../pop-up/pop-up';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';
  popUpService = inject(PopUp);
  router = inject(Router);
  private _currentUser = signal<LoginModel | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  login(email: string, password: string): Observable<LoginModel> {
    return this.http.get<LoginModel[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(map(users => {
      if(!users.length){
        throw new Error('Invalid credentials');
      }
      const user = users[0];
      this._currentUser.set(user);
      return user;
      // add here error handling
      // if email exist but passwd is incorrect, then show error about incorrect passwd
      // if email doesn't exist in database, then show message user doesn't exist, please create new account
    }));
  }
  logOut() {
    this._currentUser.set(null);
    this.popUpService.showSuccess("You have been loged out !","Log out Successsful");
  }

  changePassword(oldPassword: string, newPassword: string) {
    const user = this.currentUser();
    if(!user){
      return throwError(() => new Error("User is not logged."));
    }
    if(user.password !== oldPassword){
      return throwError(() => new Error("Actual Password is incorrect."))
      // tu powinno byc return ?
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


  createNewUser() {

  }

}
