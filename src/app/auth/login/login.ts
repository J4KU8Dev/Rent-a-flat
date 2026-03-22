import { Component, inject, signal } from '@angular/core';
import { email, FieldTree, form, required, FormField, minLength } from '@angular/forms/signals';
import { PopUp } from '../../pop-up/pop-up';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../login-model';

interface LoginData {
  email: string,
  password: string,
}

const loginModel = signal<LoginData>({
    email: '',
    password: '',
})

interface resetPasswordData {
  password: string,
}

const resetPassword = signal<resetPasswordData>({
  password: '',
});

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  popUpService = inject(PopUp);
  router = inject(Router);
  authService = inject(AuthService);
  isOpen = signal<boolean>(false);
  userToReset = signal<LoginModel | null>(null);

  signalLoginModel = form(loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required.'}),
    required(fieldPath.password, {message: 'Password is required.'}),
    email(fieldPath.email, {message: 'Enter a valid email.'});
    // available validation (i used popUp messages from popUp component)
  })

  signalresetPassword = form(resetPassword, (fieldPath) => {
    required(fieldPath.password, {message: 'Password cannot be empty'});
    minLength(fieldPath.password, 5, {message:'Password must be at least 5 characters'});
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
      error: (error) => {
        this.popUpService.showError(error.message, "Login Error");
        this.onResetForm();
      },
      complete: () => {},
    })
    
  }

  onResetForm() {
    loginModel.set({email: '', password: ''});
    this.signalLoginModel().reset();
  }

  openModal() {
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }

  resetPassword(event: Event) {
    event.preventDefault();
     if(this.signalresetPassword().invalid()){
      this.popUpService.showWarning('Incorrect Password','Reset password failure');
      return;
    }
    // if(newPassword.length < 5) {
    //   this.popUpService.showWarning("Password must be at least 5 characters","Password Validation Error");
    //   return
    // }

    const user = this.userToReset();
    if(!user){
      return;
    }
    this.authService.resetPassword(user.id, resetPassword().password).subscribe({
      next: () => {
        this.popUpService.showSuccess("Password updated successfully","Reset Password Success");
        this.closeModal();
        this.userToReset.set(null);
        resetPassword.set({password: ''});
        this.signalresetPassword().reset();
      },
      error: (err) => {
        this.popUpService.showError(err.message, "Email Validation Error");
      },
      complete: () => {},
    })


  }

  validateEmail(email: string) {
    this.authService.onCheckEmail(email).subscribe({
      next: (user) => {
        this.popUpService.showSuccess("You typed valid email","Email Validation Success");
        this.userToReset.set(user);
      },
      error: (err) => {
        this.popUpService.showError(err.message, "Email Validation Error");
      },
      complete: () => {},
    })
  }

}
