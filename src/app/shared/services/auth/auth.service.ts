import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/user.model';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import  { switchMap, Observable } from 'rxjs';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userRole!: AngularFirestoreCollection<User>;

  connected = false;
  userData: User;
  user$!: Observable<User>;

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
  }

  createNewUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginGoogle() {
    try {
      const auth = this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if(auth) {
        this.connected = true;
        localStorage.setItem('user', JSON.stringify(auth));
      }
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
