import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.model';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc!: AngularFirestoreDocument<User>;

    constructor(private dbstore: AngularFirestore, private router: Router, private auth: AngularFireAuth,) {
    this.userCollection = this.dbstore.collection('users');
  }

  addToShop(product: Product, user: User){
    const productFavorites = this.userCollection.doc(product.id);
    const userDoc = this.userCollection.doc(user.uid);
    userDoc.collection('shopping').add(productFavorites);
  }

  saveUserData(user: User){
    const userDoc = this.userCollection.doc(user.uid);
    return userDoc.set(user);
  }

  // getUser = (userID?: string) => this.userCollection.doc(userID).valueChanges();
  async getUser() {
    const userID = (await this.auth.currentUser).uid;
    const userCollect = this.userCollection.doc(userID).valueChanges();
    return  userCollect;
  }

  getAllUsers() {
    return this.dbstore.collection('users').snapshotChanges();
  }

  getInitialShoppingCart(userid: string): Observable<DocumentData[]> {
    const userDoc = this.userCollection.doc(userid);
    return userDoc.collection('shopping').valueChanges();
  }

  async getShoppingCartProducts(userid: string): Promise<Product[]> {
    const userDoc = this.dbstore.firestore.collection('users').doc(userid);
    const shopping = await userDoc.collection('shopping').get();
    return shopping.docs.map((doc) => {
      const data = doc.data() as Product;
      const id = doc.id;
      return { id, ...data };
    });
  }

}
