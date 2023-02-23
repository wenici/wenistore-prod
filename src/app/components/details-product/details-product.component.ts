import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../shared/services/products.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCardService } from '../../shared/services/shopping-card.service'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Cart, CartLocal } from '../../models/cart.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
})
export class DetailsProductComponent implements OnInit {
  title: string = 'Weni Store - Détail de produit';
  product: Product | undefined;
  productCollection: AngularFirestoreCollection<Product>;
  usersCollection: AngularFirestoreCollection<User>;
  userCollection: AngularFirestoreCollection<User>;

  carts: Cart[];
  cartsUser: Cart[];
  cartsLocal: CartLocal[];

  removeCart : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private shopping: ShoppingCardService,
    private titleService: Title,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.shopping.getOrdersProducts().subscribe((data) => {
      this.carts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Cart),
        };
      });
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    let productId= this.route.snapshot.paramMap.get('productId');
    productId && this.productService.getDetailProduct(productId).subscribe((data) => {
      this.product = data;

      let localCartData = localStorage.getItem('cart_items');
      if(productId && localCartData) {
        let items = JSON.parse(localCartData);
        items = items.filter((item: CartLocal) => this.product.id == item.productData.id.toString());
        if(items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
    })
    this.getOrderInLocalStorage()
  }

  isAuthenticated = () => this.authService.isLoggedin();

  onAddToShoppingCart(): void {
    this.onAddToOrder()
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Ce produit est ajouté au panier'
    })
  }

  async onAddToOrder(){
    const userID = (await this.auth.currentUser).uid;
    this.shopping.addToOrder(this.product, this.product.quantity, userID)
  }

  onAddToOrderInLoaclStorage(){
    const dataCart:  CartLocal = {
      id: this.product.id,
      productData: this.product,
      createdAt: new Date()
    }
    if(dataCart) {
      dataCart.productData.quantity = this.product.quantity;
      console.log(dataCart);
      this.shopping.addToLocalStorage(dataCart)
    }
  }

  removeOrderInLocalStorage(){
    this.shopping.removeToLocalStorage(this.product.id);
  }

  getOrderInLocalStorage(){

  }

  incrementProduct() {
    const qty = this.product.quantity
    this.product.quantity = qty + 1;
    console.log(this.product.quantity);
  }

  desecrementProduct() {
    const qty = this.product.quantity;
    if(qty == 1) {
      this.product.quantity = 1
    } else {
      this.product.quantity = qty - 1;
    }
    console.log(this.product.quantity);
  }

}
