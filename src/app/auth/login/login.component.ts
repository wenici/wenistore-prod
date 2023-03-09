import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  title = 'Weni Store - Connexion';
  isValidForm = false;
  isLoggedin: boolean = false;

  constructor(
    public authService: AuthService,
    public dbstore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private formBuilder: UntypedFormBuilder,
    public router: Router,
    private titleService: Title
  ) {}

  loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
  )

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  async onSubmit():Promise<void> {
    if(this.loginForm.valid) {
      this.isValidForm = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      try {
        await this.authService.loginUser(email, password);
        this.isLoggedin = true;
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
          title: 'Votre êtes bien connecté'
        })
        this.router.navigate(['acceuil']);
      } catch (error) {
        this.isValidForm = false
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
          title: 'Veillez, s\'il vous plait, bien renseigner vos données de connexion'
        })
      }
    } else if (this.loginForm.get('email')?.invalid || this.loginForm.get('password')?.invalid){
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
        title: 'Votre email ou mot de passe  est invalide'
      })
    }
  }

  loginWithGoogle() {
    this.authService.loginGoogle();
    const auth = this.authService.connected = true;
    if(auth) {
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
        title: 'Votre êtes bien connecté'
      })
      this.router.navigate(['acceuil']);
      // window.location.reload();
    }
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userData = this.dbstore.collection('users').doc(user.uid).snapshotChanges();
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    })
  }

}
