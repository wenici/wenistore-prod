import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    [x: string]: any;

    productCollection: AngularFirestoreCollection<Product>;
    
    constructor(private dbstore: AngularFirestore, private router: Router) {
      this.productCollection = this.dbstore.collection('products', (ref) => 
        ref.orderBy('name', 'desc')
      );
    }

    addProduct = (product: Product) => this.productCollection.add(product);

    getProducts() {
      return this.dbstore.collection('products').snapshotChanges();
    }

    getDetailProduct(productId: string): Observable<any> {
      return this.productCollection.doc(productId).valueChanges();
    }
    goToDetailsProduct(productId?: string): void {
      this.router.navigate(['product-details', productId]);
      console.log(productId);
        }

}
