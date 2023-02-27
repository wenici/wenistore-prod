import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  title = 'Weni Store - Connexion';
  isValidForm = false;
  isLoggedin: boolean = false;
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private formBuilder: UntypedFormBuilder,
    public router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
  }

  resetForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  }
)

  get email(): AbstractControl | null {
    return this.resetForm.get('email');
  }


  async onSubmit():Promise<void>  {

  }

  onResetPasswordEmail() {
    const email = this.resetForm.get('email')?.value;
    this.authService.resetPasswordEmail(email)
  }

}
