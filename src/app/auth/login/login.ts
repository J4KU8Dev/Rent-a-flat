import { Component, inject, signal } from '@angular/core';
import { email, FieldTree, form, required, FormField } from '@angular/forms/signals';
import { PopUp } from '../../pop-up/pop-up';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { LoginModel } from '../../login-model';
interface LoginData {
  email: string,
  password: string,
}

const loginModel = signal<LoginData>({
    email: '',
    password: '',
})

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  popUpService = inject(PopUp);
  router = inject(Router);
  authService = inject(AuthService);
  signalLoginModel = form(loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required.'}),
    required(fieldPath.password, {message: 'Password is required.'}),
    email(fieldPath.email, {message: 'Enter a valid email.'});
    // available validation (i used popUp messages from popUp component)
  })

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.signalLoginModel().invalid()){
      this.popUpService.showWarning('incorrect username or password','Login failure');
      return;
    }
    this.authService.login(loginModel().email, loginModel().password).subscribe({
      next: (user) => {
        this.popUpService.showSuccess(`You are logged as ${user.role} - ${user.firstName} ${user.lastName}.`,"Login Successful");
        this.onResetForm();
        this.router.navigateByUrl("/");
      },
      error: () => {
        this.popUpService.showError("Incorrect email or password.", "Login Error");
      },
      complete: () => {},
    })
    
  }

  onResetForm() {
    loginModel.set({email: '', password: ''});
    this.signalLoginModel().reset();
  }

}
