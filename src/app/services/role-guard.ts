import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();
  const allowedRoles = route.data?.['roles'];

  if(user && allowedRoles.includes(user.role)){
    return true;
  }

  router.navigate(['/']);
  return false;
};
