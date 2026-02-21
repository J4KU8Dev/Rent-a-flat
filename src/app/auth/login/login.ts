import { Component, inject, signal } from '@angular/core';
import { email, FieldTree, form, required, FormField } from '@angular/forms/signals';
import { PopUp } from '../../pop-up/pop-up';
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
  signalLoginModel = form(loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required.'}),
    required(fieldPath.password, {message: 'Password is required.'}),
    email(fieldPath.email, {message: 'Enter a valid email.'});
  })

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.signalLoginModel().invalid()){
      this.popUpService.showWarning('incorrect username or password','Login failure');
      return;
    }
    console.log(loginModel());
    
    // add here connection with service and api
    // find a way or idea how to check validation with email and passwd
  }


}
