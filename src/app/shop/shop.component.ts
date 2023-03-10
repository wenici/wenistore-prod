import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { CheckoutFirestore } from '../models/checkout.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopPageComponent implements OnInit {

  allProductUser: Product[];
  inCartProductUser: Product[];
  checkoutsProductUser: Product[];

  constructor(
    private auth: AngularFireAuth,
    private dbstore: AngularFirestore
  ) {
    this.auth.onAuthStateChanged((user) => {

      const userID = user.uid;

      const dataRequest = this.dbstore.collection('products', (ref) => ref.where('userID', '==', userID)).snapshotChanges();
      const dataRequest2 = this.dbstore.collection('orders', (ref) => ref.where('userID', '==', userID)).snapshotChanges();
      const dataRequest3 = this.dbstore.collection('checkouts', (ref) => ref.where('userID', '==', userID)).snapshotChanges();

      dataRequest.subscribe((data) => {
        this.allProductUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Product)
          }
        })
      })

      dataRequest2.subscribe((data) => {
        this.inCartProductUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Cart)
          }
        })
      })

      dataRequest3.subscribe((data) => {
        this.checkoutsProductUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as CheckoutFirestore)
          }
        })
      })

    })
  }

  ngOnInit() {}

}
