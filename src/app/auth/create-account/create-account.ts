import { Component, inject, signal } from '@angular/core';
import { PopUp } from '../../pop-up/pop-up';
import type { LoginModel } from '../../login-model';

const signUpData = signal<LoginModel>({
  id: '', //generate function
  gender: 'female', //male or female ?
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: 'User',
})

@Component({
  selector: 'app-create-account',
  imports: [],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount {
  popUpService = inject(PopUp);
  onSubmit(event: Event){
    event.preventDefault();
  }
}
