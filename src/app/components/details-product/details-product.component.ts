import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../shared/services/products.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs-compat';


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  title: string = 'Weni Store - Détail de produit';
  userCollection!: AngularFirestoreCollection<User>

  userID = '';
  currentUserData?: Observable<User | undefined>;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(params => this.getDetailProduct(params['productId']))
  }

  getDetailProduct(productId: string) {
    // const productId = this.route.snapshot.paramMap.get('productID')!
    this.productService.getDetailProduct(productId).subscribe(
      (data) => {
        this.product = data
    })
  }

  onAddToShoppingCart(productId: string, userID: string) {

  }

}
