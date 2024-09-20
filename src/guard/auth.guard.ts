import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../app/authentication.service';
import { inject } from '@angular/core';

export const authGuard : CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router  = inject(Router);
  const token = localStorage.getItem(authService.key)

  if(token) {
    return true
  } else {
    router.navigate(['/login']);
    return false
  }
};
