import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth-service';
import { ClickOutside } from '../shared/click-outside';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ClickOutside],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  isShowed = signal<boolean>(false);

  onToggle() {
    this.isShowed.set(!this.isShowed());
  }
  onClose() {
    this.isShowed.set(false);
  }
}
