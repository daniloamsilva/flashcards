import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user$ = user(auth);
  const userService = inject(UserService);

  return user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        userService.setUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
      return !!user;
    }),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
  );
};
