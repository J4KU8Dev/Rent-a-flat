import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginModel } from '../login-model';
import { UserManagementService } from '../services/user-management-service';
import { PopUp } from '../pop-up/pop-up';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement implements OnInit{
  userManagementService = inject(UserManagementService);
  authService = inject(AuthService);
  popUpService = inject(PopUp);
  users = signal<LoginModel[]>([]);
  modal = signal<boolean>(false);
  ngOnInit(): void {
    this.userManagementService.getAllUsers().subscribe({
      next:(data) => {
        this.users.set(data);
      },
      error:() => {},
      complete:() => {},
      // add error hanlding and popUp messages
    })
  }

  switchModal() {
    console.log(this.modal());
    this.modal.set(!this.modal());
  }


  
}
