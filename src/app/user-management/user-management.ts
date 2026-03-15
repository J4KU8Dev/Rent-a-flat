import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginModel } from '../login-model';
import { UserManagementService } from '../services/user-management-service';
import { PopUp } from '../pop-up/pop-up';
import { AuthService } from '../services/auth-service';
import { email, form, minLength, pattern, required, debounce, FormField } from '@angular/forms/signals';
import { ConfirmModal } from "../shared/confirm-modal/confirm-modal";


@Component({
  selector: 'app-user-management',
  imports: [FormField, ConfirmModal],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement implements OnInit{
  userManagementService = inject(UserManagementService);
  authService = inject(AuthService);
  popUpService = inject(PopUp);
  users = signal<LoginModel[]>([]);
  modal = signal<boolean>(false);
  formMode = signal<'create' | 'edit'>('create');
  showConfirm = signal<boolean>(false);
  selectedUserId = signal<string | null>(null);

  onRefresh() {
    this.userManagementService.getAllUsers().subscribe({
      next:(data) => {
        this.users.set(data);
      },
      error:(err) => {
        this.popUpService.showError(err.message, 'Database fetch error');
      },
      complete:() => {},
    })
  }

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
    this.onRefresh();
  }

  switchModal() {
    this.modal.set(!this.modal());
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    if(this.signUpForm().invalid()){
      this.popUpService.showWarning('Please check and correct your informations','Creating/update account failure');
      return;
    }
    if(this.formMode()==='create') {
      console.log('new user data: ',this.signUpData())
      this.userManagementService.createUser(this.signUpData()).subscribe({
        next:() => {
          this.popUpService.showSuccess('New user has been created', 'Adding new user success');
          this.onRefresh();
          this.switchModal();
          this.onResetForm();
        },
        error:(error) => {
          this.popUpService.showError(error.message,'Creating account failure');
        },
        complete:() => {},
      })
    }
    if(this.formMode()==='edit') {
      this.userManagementService.editUser(this.signUpData()).subscribe({
        next:() => {
          this.popUpService.showSuccess('User data updated successfully', `User ${this.signUpData().firstName} updated`);
          this.onRefresh();
          this.switchModal();
        },
        error:(error) => {
          this.popUpService.showError(error.message, 'Updating user failure');
        },
        complete:() => {},
      })
      
      
    }
    
  }

  onDeleteUser(userId: string){
    this.selectedUserId.set(userId);
    this.showConfirm.set(true);    
  }

  onResetForm() {
    this.signUpData.set({id: this.authService.onCreateUniqueId(), gender: '', firstName: '', lastName: '', email: '', password: '', phone: '', role: 'User'});
    this.signUpForm().reset();
  }

  onEditUser(userData: LoginModel) {
    this.formMode.set('edit');
    this.signUpData.set(userData);
    console.log(this.signUpData());
    this.switchModal();
  }

  onCreateUser() {
    this.onResetForm();
    this.formMode.set('create');
    this.switchModal();
  }
  
  confirmDelete() {
    const id = this.selectedUserId();
    if(!id){
      return
    };
    this.userManagementService.deleteUser(id).subscribe({
      next:() => {
        this.popUpService.showSuccess(`User deleted successfully`, 'Deleting user ');
        this.onRefresh();
      },
      error:() => {
        this.popUpService.showError('An error ocured', 'Deleting user error');
      },
      complete:() => {},
    });
    this.showConfirm.set(false);
    
  }

  onDeleteClick(userId: string) {
    this.selectedUserId.set(userId);
    this.showConfirm.set(true);
  }

  cancelDelete(){
    this.showConfirm.set(false);
  }
}