import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/database/user.service';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  title = 'Weni Store - Inscription';
  isValidForm = false;
  isLoggedin: boolean = false;
  userData: any;
  hide = true;
  role: 'client';

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
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

  ngOnInit() { this.titleService.setTitle(this.title) }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isValidForm = true;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      try {
        const authResult = await this.authService.createNewUser(email, password);
        const user: User = {
          createdAd: new Date(),
          roles: { subscriber: true, admin: false, shop: false },
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          uid: authResult.user?.uid,
          nom: this.registerForm.get('name')?.value,
          phone: this.registerForm.get('phone')?.value,
        };
        this.userService.saveUserData(user);
        //  authResult.user?.sendEmailVerification();
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

}
