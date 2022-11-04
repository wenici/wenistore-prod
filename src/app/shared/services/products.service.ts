import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { take, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    productCollection: AngularFirestoreCollection<Product>;
    
    constructor(private dbstore: AngularFirestore, private router: Router) {
      this.productCollection = this.dbstore.collection('products', (ref) => 
        ref.orderBy('category', 'desc')
      );
    }


    addProduct = (product: Product) => this.productCollection.add(product);

    getProducts() {
      return this.dbstore.collection('products').snapshotChanges();
    }

    getByPriceProducts() {
      return this.dbstore.collection('products', (ref) => ref.orderBy('price', 'desc')).snapshotChanges();
    }

    getByCategoryProducts() {
      return this.dbstore.collection('products', (ref) => ref.orderBy('category', 'desc')).snapshotChanges();
    }

    getDetailProduct(productId: string): Observable<any> {
      return this.productCollection.doc(productId).valueChanges();
    }

    goToDetailsProduct(productId: string) {
      this.router.navigate(['product-details', productId]);
      console.log(productId);
        }

}
