import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class CategoriesService {

  constructor(private dbstore: AngularFirestore) { }

  getByPriceProducts() {
    return this.dbstore.collection('products', (ref) => ref.orderBy('price', 'desc')).snapshotChanges();
  }

  getProductsByFood() {
    return this.dbstore.collection('products', (ref) => ref.where('category', '==', 'Nourriture')).snapshotChanges();
  }

  getProductsByPhone() {
    return this.dbstore.collection('products', (ref) => ref.where('category', '==', 'Téléphone')).snapshotChanges();
  }

  getProductsByChaussures() {
    return this.dbstore.collection('products', (ref) => ref.where('category', '==', 'Chaussure')).snapshotChanges();
  }

  getProductsByVetements() {
    return this.dbstore.collection('products', (ref) => ref.where('category', '==', 'Vêtements')).snapshotChanges();
  }

}
