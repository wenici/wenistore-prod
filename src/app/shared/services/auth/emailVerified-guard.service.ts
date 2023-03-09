import { AngularFireAuthGuard, emailVerified, AuthPipeGenerator } from '@angular/fire/compat/auth-guard'
import { map } from 'rxjs/operators'
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifiedGuardService {

  constructor(private authGuard: AngularFireAuthGuard, private router: Router) {}
}

const redirectUnauthorizedOrUnverifiedUser: AuthPipeGenerator = () =>
map(user => {
  if (user) {
    if (user.emailVerified) {
      return true
    } else {
      return ['login', 'verify-email']
    }
  } else {
    return ['login']
  }
})

export default redirectUnauthorizedOrUnverifiedUser;
