import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { LoginModel } from '../../login-model';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit{
  authService = inject(AuthService);
  user = signal<LoginModel | null>(null);
  
  ngOnInit(): void {
    this.user.set(this.authService.currentUser());
  }

}
