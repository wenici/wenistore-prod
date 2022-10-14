import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase/compat/app';
type UserCredential = Promise<firebase.default.auth.UserCredential>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: any; 
  useR$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  createNewUser(email: string, password: string): UserCredential {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): UserCredential {
    return this.afAuth.signInWithEmailAndPassword(email, password);
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
      this.router.navigate(['acceuil'])
    })
  }

  isLoggedin() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }


}
