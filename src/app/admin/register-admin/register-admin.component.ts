import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/database/user.service';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import 'firebase/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  title = 'Weni Store - Inscription';
  isValidForm = false;
  isLoggedin: boolean = false;
  userData: any;
  hide = true;
  role: 'admin';
  user: User

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private afAuth: AngularFireAuth,
    public dbstore: AngularFirestore
  ) {}

  registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }
  )

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
}
  get phone(): AbstractControl | null {
    return this.registerForm.get('phone');
  }
  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title)
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isValidForm = true;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      try {
        this.authService.createNewUserShop(email, password).then((credential) => {
          this.updateUserDataCredential(credential.user)
        });
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
          title: 'Compte cré avec succès'
        })
        this.router.navigate(['acceuil']);
      } catch (error) {
        // Message error with sweetAlert 2
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
          title: 'Veillez renseigner correctement les differents s\'il vous plait'
        })
        this.router.navigate(['register']);
      }
    }
  }

  updateUserDataCredential(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.dbstore.doc(`users/${user.uid}`);
    const userData: User = {
      createdAd: new Date(),
      uid: user.uid,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      nom: this.registerForm.get('name')?.value,
      phone: this.registerForm.get('phone')?.value,
      roles: { subscriber: true, admin: true, shop: true },
    };
    return userRef.set(userData, { merge: true })
  }
}
