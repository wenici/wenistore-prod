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
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class ShoppingCardService {
  productsCollection: AngularFirestoreCollection<Product>;
  userCollection: AngularFirestoreCollection<User>;
  productCollectionGroup: AngularFirestoreCollectionGroup<Product>
  orderCollection: AngularFirestoreCollection<Cart>;
  orderLocalCollection: AngularFirestoreCollection<CartLocal>;
  cartCollection: AngularFirestoreCollection<Cart>;
  checkoutCollection: AngularFirestoreCollection<CheckoutFirestore>;
  checkoutLocalToFirestoreCollection: AngularFirestoreCollection<CheckoutLocal>;
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
  ) {
    this.productsCollection = this.dbstore.collection('products');
    this.userCollection = this.dbstore.collection('users');
    this.orderCollection = this.dbstore.collection('orders');
    this.checkoutCollection = this.dbstore.collection('checkouts');
  }

  addToLocalStorage(cartLocalData: CartLocal): void {
    let cartData = [];
    let localCart = localStorage.getItem('cart_items');
    if (!localCart) {
      localStorage.setItem('cart_items', JSON.stringify([cartLocalData]))
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(cartLocalData);
      localStorage.setItem('cart_items', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeToLocalStorage(cartLocalID: string): void {
    let localCartData = localStorage.getItem('cart_items');
    if (localCartData) {
      let items: CartLocal[] = JSON.parse(localCartData);
      items = items.filter((item: CartLocal) => cartLocalID! == item.id);
      localStorage.setItem('cart_items', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  async addToOrder(product: Product, quantity: number, userID: string): Promise<void> {
    this.orderCollection.add({
      productData: product,
      quantity: quantity,
      userID: userID,
      createdAt: new Date(),
    });
  }

  getOrdersProducts(): Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]> {
    return this.dbstore.collection('orders').snapshotChanges();
  }

  removeToOrder(productID: string): void {
    this.orderCollection.doc(productID).delete();
  }

  getUserProductOrder(): void {
    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      return this.dbstore.collection('orders', (ref) => ref.where('userID', '==', userIDAuth)).snapshotChanges();;
    });
  }

  getOrdersByUser(): Observable<unknown[]> {
    return this.dbstore.collection('orders').valueChanges()
  }

  addToCheckouts = (checkout: CheckoutFirestore) => this.checkoutCollection.add(checkout);

  addToCheckoutsLocalToFirestore = (checkoutLoal: CheckoutLocal) =>
    this.checkoutLocalToFirestoreCollection.add(checkoutLoal);

  getCheckouts(): Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]> {
    return this.dbstore.collection('checkouts').snapshotChanges();
  }
}
