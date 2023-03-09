import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/user.model';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userRole!: AngularFirestoreCollection<User>;
  dataUser: User;
  connected = false;
  userData: User;
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public dbstore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userData = user;
        localStorage.setItem('user', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.dbstore.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }


  createNewUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // create account for shop
  createNewUserShop(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  resetPasswordEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
  }

  loginGoogle() {
    try {
      const auth = this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if(auth) {
        this.connected = true;
        localStorage.setItem('user', JSON.stringify(auth));
      }
      auth.then(() => {
        this.router.navigate(['acceuil'])
      })
    } catch (error) {
      this.connected = false;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Une erreur s\'est produite'
      })
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Compte deconnecté'
      })
      window.location.reload();
    })
  }

  isLoggedin() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

}
