import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
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
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> | boolean {
    return this.canActivate(route, state)
  }
}
