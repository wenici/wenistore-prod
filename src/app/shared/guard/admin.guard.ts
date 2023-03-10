import { Injectable } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.user$.pipe(
        take(1),
        map(user => user && user.roles.admin ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['error/acces-no-dedied'])
            console.error('Accès non dédié - Seulement pour les boutiques');
          }
        })
      );;
  }

}
