import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    name: [''],
    adress: ['', Validators.required],
    phone: ['', Validators.required],
    delevery: ['', Validators.required],
    payBy: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder, public snack: MatSnackBar, public router: Router) {}

  dataSended: boolean = false;
  displayDetails: boolean = true;
  ngOnInit(): void {}

  doneForm(): void {
    console.log(this.firstFormGroup.value);
    if(this.displayDetails) {
      this.router.navigate(['acceuil']);
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Commande enregistrée',
    });
    this.dataSended = true;
  }


}
