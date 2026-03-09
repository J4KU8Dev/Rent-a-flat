import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginModel } from '../login-model';
import { UserManagementService } from '../services/user-management-service';
import { PopUp } from '../pop-up/pop-up';
import { AuthService } from '../services/auth-service';
import { email, form, minLength, pattern, required, debounce, FormField } from '@angular/forms/signals';


@Component({
  selector: 'app-user-management',
  imports: [FormField],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement implements OnInit{
  userManagementService = inject(UserManagementService);
  authService = inject(AuthService);
  popUpService = inject(PopUp);
  users = signal<LoginModel[]>([]);
  modal = signal<boolean>(false);

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

  ngOnInit(): void {
    this.userManagementService.getAllUsers().subscribe({
      next:(data) => {
        this.users.set(data);
      },
      error:(error) => {
        this.popUpService.showError('Returned 0 users. Please restart database', 'Database fetch error');
        
      },
      complete:() => {},
    })
  }

  switchModal() {
    this.modal.set(!this.modal());
  }
  
  onCreateNewUser(event: Event) {
    event.preventDefault();
    if(this.signUpForm().invalid()){
      this.popUpService.showWarning('Please check and correct your informations','Creating account failure');
      return;
    }
    //add switch map to check if email exist in database!
    this.userManagementService.createUser(this.signUpData()).subscribe({
      next:() => {
        this.popUpService.showSuccess('New user has been created', 'Adding new user success');
        this.userManagementService.getAllUsers().subscribe({
          next:(data) => {
            this.users.set(data);
          },
        })
        this.switchModal();
        // clear creating user form!
      },
      error:(error) => {
        this.popUpService.showError(error.message,'Creating account failure');
      },
      complete:() => {},
    })

    console.log(this.signUpData())

  }

  onDeleteUser(userId: string){
    this.userManagementService.deleteUser(userId).subscribe({
      next:() => {
        this.popUpService.showSuccess('User deleted successfully', 'Deleting user ');
        this.userManagementService.getAllUsers().subscribe({
          next:(data) => {
            this.users.set(data);
          },
        })
      },
      error:() => {
        this.popUpService.showError('An error ocured', 'Deleting user error');
      }
    })
   
  
  }

  
}
