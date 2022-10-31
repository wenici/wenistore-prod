import { Injectable } from '@angular/core';
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

  constructor(private dbstore: AngularFirestore, private router: Router) {
    this.userCollection = this.dbstore.collection('users');
  }

  addToShop(product: Product, user: User){
    const productFavorites = this.userCollection.doc(product.id);
    const userDoc = this.userCollection.doc(user.id);
    userDoc.collection('shopping').add(productFavorites);
  }

  newUser(user: User): Promise<void> {
    const defautCentreInteret = {
      categoryName: 'Vêtements',
      categoryCouleur: '#ff91f9',
    };
    const userDoc = this.userCollection.doc(user.id);
    userDoc.collection('centre_interets').add(defautCentreInteret);
    return userDoc.set(user);
  }

  // getUser = (userID?: string) => this.userCollection.doc(userID).valueChanges();
  getUser(userID: string) {
    const userCollect = this.userCollection = this.dbstore.collection('users');
    userCollect.doc(userID).valueChanges();
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
