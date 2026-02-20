import { Component, signal } from '@angular/core';
import { email, FieldTree, form, required, FormField } from '@angular/forms/signals';
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
  signalLoginModel = form(loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required.'}),
    required(fieldPath.password, {message: 'Password is required.'}),
    email(fieldPath.email, {message: 'Enter a valid email.'});
  })

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(loginModel());
    // add here connection with service and api
    // find a way or idea how to check validation with email and passwd
  }


}
