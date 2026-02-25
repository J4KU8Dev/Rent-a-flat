import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { LoginModel } from '../../login-model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-account',
  imports: [RouterLink],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit{
  authService = inject(AuthService);
  user = signal<LoginModel | null>(null);
  clicked = signal<boolean>(false);
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

}
