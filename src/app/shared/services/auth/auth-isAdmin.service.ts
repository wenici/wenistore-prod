import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthIsAdminService implements CanActivate {

    constructor(
      private auth: AngularFireAuth,
      private router: Router,
      private dbstore: AngularFirestore
    ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((userAuth) => {
        const userAuthID = userAuth.uid;
        const isAdmin = 'admin';
        const dataRequest = this.dbstore.collection('users', (ref) =>
          ref
          .where('userID', '==', userAuthID )
          .where('role', '==', isAdmin)).get()
        if (!dataRequest) {
          resolve(false);
          this.router.navigate(['acceuil'])
        } else {
          resolve(true);
        }
      });
    });
  }
}
