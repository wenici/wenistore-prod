import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((userAuth) => {
        if (!userAuth) {
          resolve(false);
          this.router.navigate(['login'])
        } else {
          resolve(true);
        }
      });
    });
  }
}
