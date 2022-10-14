import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import "firebase/auth";

import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  productsCollection: AngularFirestoreCollection<Product>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private readonly dbstore: AngularFirestore) {
    this.productsCollection = this.dbstore.collection('products');
    this.userCollection = this.dbstore.collection('users');
  }

  getItems() {
    return this.dbstore.collection('shopping').snapshotChanges();
  }

  async isMyShoppingCartProduct(product: Product, userID: string): Promise<void> {
    const userDoc = this.dbstore.firestore.collection('users').doc(userID);
    const userShoppingProduct = userDoc.collection('shopping');
    const shopCartPrtDoc = await userShoppingProduct.doc(product.id).get();
    product.isMyProduct = shopCartPrtDoc.exists;
  }

  addToMyCart(product: Product, userID: string, qteProduct: number): Promise<void> {
    const productDoc = this.productsCollection.doc(product.id);
    productDoc.update({ quantity: qteProduct });
    const userDoc = this.dbstore.firestore.collection('users').doc(userID)
    const userShoppingProduct = userDoc.collection('shopping');
    return userShoppingProduct.doc(product.id).set(product);
  }

  removeToMyCart(product: Product, userID: string, qteProduct: number): Promise<void> {
    const productDoc = this.productsCollection.doc(product.id);
    productDoc.update({ quantity: qteProduct });
    const userDoc = this.userCollection.doc(userID);
    const userShoppingProduct = userDoc.collection('shopping');
    return userShoppingProduct.doc(product.id).delete();
  }

  async getProductsUser(userID: string): Promise<Product[]> {
    const userDoc = this.dbstore.firestore.collection('users').doc(userID);
    const querySnapshot = await userDoc.collection('shopping').get();
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      const product = doc.id;
      return { product, ...data };
    });
  }

}
