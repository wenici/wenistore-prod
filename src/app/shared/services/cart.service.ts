import { Injectable, EventEmitter } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup
} from '@angular/fire/compat/firestore';

import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { Cart, CartLocal } from 'src/app/models/cart.model';
import { Router } from '@angular/router';
import { CheckoutFirestore, CheckoutLocal } from '../../models/checkout.model';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {

  user: User;
  product: Product;
  ordersLocal: CartLocal;
  orders: Cart;
  checkout: CheckoutFirestore;
  cartData = new EventEmitter<CartLocal[] | []>()

  constructor(
    private readonly dbstore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

}
