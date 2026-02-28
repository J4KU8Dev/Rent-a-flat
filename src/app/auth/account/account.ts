import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { LoginModel } from '../../login-model';
import { form, FormField } from '@angular/forms/signals';

interface changePasswordModel {
  oldPassword: string,
  newPassword: string,
}



@Component({
  selector: 'app-account',
  imports: [FormField],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit{
  authService = inject(AuthService);
  user = signal<LoginModel | null>(null);
  clicked = signal<boolean>(false);
  checked = signal<boolean>(false);
  changePassword = signal<changePasswordModel>({
    oldPassword: '',
    newPassword: '',
  })

  changePasswordForm = form(this.changePassword);
  ngOnInit(): void {
    if(this.user==null){
      // route to login component to prevent from checking account settins without logged account
    }
    this.user.set(this.authService.currentUser());
  }

  onOpenModal() {
    this.clicked.set(true);
  }

  onCloseModal() {
    this.clicked.set(false);
  }

  onToggle(){
    // console.log("clicked")
    this.checked.set(!this.checked());
  }

  onSubmit(event: Event){
    event.preventDefault();
    console.log(this.changePassword());
  }
}
