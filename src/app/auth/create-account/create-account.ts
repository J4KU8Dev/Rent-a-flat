import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PopUp } from '../../pop-up/pop-up';
import type { LoginModel } from '../../login-model';
import { debounce, email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-account',
  imports: [FormField],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccount {
  popUpService = inject(PopUp);
  authService = inject(AuthService);
  router = inject(Router);
  signUpData = signal<LoginModel>({
    id: this.authService.onCreateUniqueId(),
    gender: '', 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'User',
  })
  
  signUpForm = form(this.signUpData,(fieldPath) => {
    debounce(fieldPath.email, 500);
    required(fieldPath.gender, {message:'Gender is required' })
    required(fieldPath.firstName, {message: 'First name is required'});
    required(fieldPath.lastName, {message: 'Last name is required'});
    required(fieldPath.email, {message: 'Email is required'});
    required(fieldPath.password, {message: 'Password is required'});
    email(fieldPath.email, {message: 'Please enter a valid email address'});
    minLength(fieldPath.password,5 , { message: 'Your password needs at least 5 characters'});
    pattern(fieldPath.phone, /^\d{3}-\d{3}-\d{3}$/,{ message: 'Phone number must be in format: 123-456-789'})
  });

  onSubmit(event: Event){
    event.preventDefault();
    if(this.signUpForm().invalid()){
      this.popUpService.showWarning('Please check and correct your informations','Creating account failure');
      return;
    }
    this.authService.createNewUser(this.signUpData()).subscribe({
      next:() => {
        this.popUpService.showSuccess('Your account has been created!', 'Creating account success');
        this.onResetForm();
        this.router.navigateByUrl("/login");
        console.log(this.signUpData());
      },
      error:(error) => {
        this.popUpService.showError(error.message,'Creating account failure');
      },
      complete:() => {},
    })
    
  }
  

  onResetForm() {
    this.signUpData.set({id: '',gender: '', firstName: '', lastName: '', email: '', password: '', phone: '', role: 'User'});
    this.signUpForm().reset();
  }
}
