import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PopUp } from '../../pop-up/pop-up';
import type { LoginModel } from '../../login-model';
import { debounce, form, FormField, required } from '@angular/forms/signals';



@Component({
  selector: 'app-create-account',
  imports: [FormField],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccount {
  popUpService = inject(PopUp);
  
  signUpData = signal<LoginModel>({
    id: this.onCreateUniqueId(),
    gender: 'unknown', 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'User',
  })
  
  signUpForm = form(this.signUpData,(fieldPath) => {
    debounce(fieldPath.email, 500);
    required(fieldPath.firstName, {});
    required(fieldPath.lastName, {});
    required(fieldPath.email, {});
    required(fieldPath.password, {});
  });

  onSubmit(event: Event){
    event.preventDefault();
    console.log(this.signUpData())
  }
  onCreateUniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
}
