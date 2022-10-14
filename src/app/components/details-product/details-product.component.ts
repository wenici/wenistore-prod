import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  
  userID!: string;
  quantity: number = 0;
  productIdRoute: string;
  isMyProduct: boolean = false;
  product: Observable<Product>;
  msg: string = 'Weni Store - Détail de produit';
  title = this.msg;
  userCollection!: AngularFirestoreCollection<User>

  prod: any;
  prodID: any;
  products: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCardService: ShoppingCardService,
    private titleService: Title
  ) {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdRoute = String(routeParams.get('productId'));
    this.product = this.productService.getDetailProduct(this.productIdRoute);
  }

  ngOnInit(): void {
    // this.product = this.productService.getDetailProduct(this.productIdRoute);
    this.titleService.setTitle(this.title);
    const routeParams = this.route.snapshot.paramMap;
    const route = this.productIdRoute = String(routeParams.get('productId'));
    console.log(route);
  //   const routeParamsx = this.route.snapshot.paramMap;
  // const productIdFromRoute = Number(routeParams.get('productId'));
  // this.product = products.find((product: { id: number; }) => product.id === productIdFromRoute);
  }

  saveCartLocation(): void {
    localStorage.setItem('cartSaved', JSON.stringify(this.product));
  }

  removeCartLocation(): void {
    localStorage.removeItem(JSON.stringify(this.product));
  }

  deleteAllCartLocation(): void {
    localStorage.clear();
  }

  onAddToShoppingCart(product: Product, userID: string): void {
    const qteProduct = (product.quantity += 1);
    product.isMyProduct = true;
    this.shoppingCardService.addToMyCart(product, userID, qteProduct);
    this.saveCartLocation();
  }

  onRemoveToShoppingCart(product: Product, userID: string): void {
    const qteProduct = (product.quantity -= 1);
    if (qteProduct == 0) {
      product.isMyProduct = false;
    } else product.isMyProduct = true;
    this.shoppingCardService.removeToMyCart(product, userID, qteProduct)
  }

  onRemoveAllToShoppingCart(product: Product, userID: string): void {
    const qteProduct = (product.quantity -= 1);
    if (qteProduct == 0) {
      product.isMyProduct = false;
    } else product.isMyProduct = true;
    this.shoppingCardService.removeToMyCart(product, userID, qteProduct)
  }


}
