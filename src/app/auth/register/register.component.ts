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
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }
  )

  get firstName(): AbstractControl | null {
    return this.registerForm.get('firstName');
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

  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
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
          id: authResult.user?.uid,
          nom: this.registerForm.get('firstName')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          phone: this.registerForm.get('phone')?.value,
          createdAd: new Date(),
          role: this.role,
        };
         this.userService.newUser(user);
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
    } else if (
      this.registerForm.get('username')?.invalid
      || this.registerForm.get('email')?.invalid
      || this.registerForm.get('password')?.invalid
      || this.registerForm.get('confirmPassword')?.invalid
    ) {
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
        title: 'Veillez renseigner correctement tous les differents s\'il vous plait'
      })
      this.router.navigate(['register']);
    }
  }

}
