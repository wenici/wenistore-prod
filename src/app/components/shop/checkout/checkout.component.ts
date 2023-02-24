import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { CheckoutFirestore, CheckoutLocal } from '../../../models/checkout.model';
import { Product } from '../../../models/product.model';
import { ShoppingCardService } from '../../../shared/services/shopping-card.service';
import { Cart } from 'src/app/models/cart.model';
import { CartLocal } from '../../../models/cart.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart;
  cartLocal: CartLocal
  checkoutLocal: CheckoutLocal
  checkoutFirestore: CheckoutFirestore

  userData: User;
  cartsUser: Cart[];
  cartsLocal: CartLocal[];

  totalQty: number;
  totalPrice: number

  firstFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    userName: ['', Validators.required],
    phone: ['', Validators.required],
    lieuDeLiraison: ['', Validators.required],
    typeDelivraison: ['', Validators.required],
    modePayement: ['', Validators.required],
  });

  twoFormGroup = this._formBuilder.group({
    lieuDeLiraison: ['', Validators.required],
    typeDelivraison: ['', Validators.required],
    modePayement: ['', Validators.required],
  })

  formattedaddress = "";
  options : Options  = {
    componentRestrictions: {
      country: "CI"
    },
    bounds: undefined,
    types: [],
    fields: [],
    strictBounds: false,
    origin: undefined
  }
  constructor(
    private _formBuilder: FormBuilder,
    public snack: MatSnackBar,
    public router: Router,
    private sanitizer: DomSanitizer,
    private auth: AngularFireAuth,
    public authService: AuthService,
    private dbstore: AngularFirestore,
    private shopping: ShoppingCardService
  ) {
    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      if (userAuth.uid) {
        const userDoc = this.dbstore.collection('users').doc(userIDAuth).valueChanges();
        userDoc.subscribe((data) => {
          this.userData = data;
        })
      }
    });
    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      const dataRequest = this.dbstore.collection('orders', (ref) => ref.where('userID', '==', userIDAuth)).snapshotChanges();
      dataRequest.subscribe( data => {
        this.cartsUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Cart)
          }
        })
        const quantityTotal  = this.cartsUser.reduce((prevVal, currentQty) => {
          return prevVal + currentQty.quantity
        }, 0);
        this.totalQty = quantityTotal;
        const calutPriceTotal = this.cartsUser.reduce((prevVal, currentVal) => {
          if(currentVal.quantity > 2) {
            return prevVal + ((currentVal.productData.price - 200) * currentVal.quantity)
          } else {
              return prevVal + (currentVal.productData.price * currentVal.quantity)
          }
        }, 0)
        return this.totalPrice = calutPriceTotal;
      })
    })
    this.cartsLocal = JSON.parse(localStorage.getItem('cart_items'));
    console.log('cart',this.cartsLocal);
  }
  isAuthenticated = () => this.authService.isLoggedin();


  public AddressChange(address: any) {
    this.firstFormGroup = address.formatted_address
    }

  dataSended: boolean = false;
  displayDetails: boolean = true;

  ngOnInit(): void {}

  async onSubmitWhenUserConnected(){

    if(this.twoFormGroup.valid) {
      
     try {

      const userID = (await this.auth.currentUser).uid;
      const lieuDeLivraison: string = this.twoFormGroup.get('lieuDeLiraison')?.value;
      const modePayement: string = this.twoFormGroup.get('modePayement')?.value;
      const typeLivraison: string = this.twoFormGroup.get('typeDelivraison')?.value;

      const sanitizerPayValue: string = this.sanitizer.sanitize(SecurityContext.HTML, modePayement);
      const sanitizerAddressValue: string = this.sanitizer.sanitize(SecurityContext.HTML, lieuDeLivraison);
      const sanitizerTypeLivraisonValue: string = this.sanitizer.sanitize(SecurityContext.HTML, typeLivraison);

      const checkout: CheckoutFirestore = {
        order: this.cartsUser,
        userID: userID,
        lieuDeLiraison: sanitizerAddressValue,
        modePayement: sanitizerPayValue,
        typeDelivraison: sanitizerTypeLivraisonValue,
        createdAt: new Date(),
        dateDeLiraison: Date()
      }
      this.shopping.addToCheckouts(checkout);
      this.onDeleteAllProductsInShoppingCartUser()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        Toast.fire({
          icon: 'success',
          title: 'Produit enregistré avec succès',
        });
        this.router.navigate(['acceuil'])
     } catch  (error){
      console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Erreur d\'enregistrement',
        });
     }
    }
  }

  onSubmitWhenUserNoConnected(){
    if(this.firstFormGroup.valid) {
     try {
      const checkout: CheckoutLocal = {
        order: this.cartsLocal,
        userName: this.firstFormGroup.get('userName')?.value,
        phone: this.firstFormGroup.get('phone')?.value,
        email: this.firstFormGroup.get('email')?.value,
        lieuDeLiraison: this.firstFormGroup.get('lieuDeLiraison')?.value,
        modePayement: this.firstFormGroup.get('modePayement')?.value,
        typeDelivraison: this.firstFormGroup.get('typeDelivraison')?.value,
        createdAt: new Date(),
        dateDeLiraison: Date()
      }
      this.shopping.addToCheckoutsLocalToFirestore(checkout);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
        Toast.fire({
          icon: 'success',
          title: 'Produit enregistré avec succès',
        });
        this.router.navigate(['acceuil'])
     } catch  (error){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Erreur d\'enregistrement',
        });
     }
    }
  }

  
  onGoToShopping(){
    if(this.isAuthenticated) {
      this.onSubmitWhenUserConnected();
    } else if(!this.isAuthenticated) {
      this.onSubmitWhenUserNoConnected();
    }
  }

  onDeleteAllProductsInShoppingCartUser(){
    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      const dataRequest = this.dbstore.collection('orders', (ref) => ref.where('userID', '==', userIDAuth)).snapshotChanges();
      dataRequest.subscribe( data => {
        data.forEach((query) => {
          let userProductID = query.payload.doc.id;
          this.dbstore.collection('orders').doc(userProductID).delete();
        })
      })
    })
  }


}
