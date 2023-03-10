import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProductUser: Product[];

  constructor(
    private auth: AngularFireAuth,
    private dbstore: AngularFirestore
  ) {
    this.auth.onAuthStateChanged((user) => {

      const userID = user.uid;

      const dataRequest = this.dbstore.collection('products', (ref) => ref.where('userID', '==', userID)).snapshotChanges();

      dataRequest.subscribe((data) => {
        this.allProductUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Product)
          }
        })
      })

    })
  }

  ngOnInit(): void {
  }

}
