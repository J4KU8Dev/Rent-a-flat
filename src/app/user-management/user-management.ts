import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoginModel } from '../login-model';
import { UserManagementService } from '../services/user-management-service';
import { PopUp } from '../pop-up/pop-up';
import { AuthService } from '../services/auth-service';
import { email, form, minLength, pattern, required, debounce, FormField, disabled } from '@angular/forms/signals';
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

  sortColumn = signal<keyof LoginModel | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');
  filterText = signal<string>('');

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
    disabled(fieldPath.role, () => this.isEditingSelf())
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
      error:(err) => {
        this.popUpService.showError(err.message, 'Deleting user error');
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
  
  onSortBy(column: keyof LoginModel) {
    if(this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    }
    else{
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  filteredUsers = computed(() => {
    const users = [...this.users()];
    const search = this.filterText();
    const column = this.sortColumn();
    const direction = this.sortDirection();
    
    let result = users;

    if(search) {
      result = result.filter(user =>
        user.firstName.toLocaleLowerCase().includes(search) ||
        user.lastName.toLocaleLowerCase().includes(search) ||
        user.email.toLocaleLowerCase().includes(search) ||
        user.phone.toLocaleLowerCase().includes(search) ||
        user.role.toLocaleLowerCase().includes(search))
    }

    if(column){
      result = result.sort((a,b) => {
        const valueA = a[column];
        const valueB = b[column];

        if(valueA < valueB){
          return direction === 'asc' ? -1 : 1;
        }
        if(valueA > valueB){ 
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    }
    return result
  })

  isCurrentUser(user: LoginModel):boolean {
    return user.id === this.authService.currentUser()?.id;
  }

  isEditingSelf = computed(() => this.selectedUserId() === this.authService.currentUser()?.id);
}