import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/database/user.service';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-shop',
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent implements OnInit {

  title = 'Weni Store - Inscription';
  isValidForm = false;
  isLoggedin: boolean = false;
  userData: any;
  hide = true;
  role: 'shop'

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
      nameShop: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(8)]],
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
  get nameShop(): AbstractControl | null {
    return this.registerForm.get('nameShop')
  }
  get address(): AbstractControl | null {
    return this.registerForm.get('address')
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
           uid: authResult.user?.uid,
           nom: this.registerForm.get('name')?.value,
           phone: this.registerForm.get('phone')?.value,
           email: this.registerForm.get('email')?.value,
           address: this.registerForm.get('address')?.value,
           nomShop: this.registerForm.get('nameShop')?.value,
           password: this.registerForm.get('password')?.value,
           roles: { subscriber: true, admin: false, shop: true },
        };
        this.userService.saveUserData(user);
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
        this.router.navigate(['shop-page/products']);
      } catch (error) {
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
        this.router.navigate(['auth/register-shop']);
      }
    }
  }

}
