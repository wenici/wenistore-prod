import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import { UserService } from '../../shared/services/database/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user.model';
import { Cart } from 'src/app/models/cart.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  quantity: number = 0;
  prod: any;
  product: Product ;
  cart: Cart;
  carts!: any;
  cartsUser: Cart[];
  userData: User
  filterByName: any;
  userCollection: AngularFirestoreCollection<User>;
  orderCollection: AngularFirestoreCollection<Cart>;
  productCollectionGroup: AngularFirestoreCollectionGroup<Product>
  isDelete: boolean = false;
  totalQty: number;
  totalPrice: number;
  userId: any;
  cartItems = 0;


  constructor(
    public router: Router,
    public authService: AuthService,
    public productService: ProductsService,
    private shopping: ShoppingCardService,
    public user: UserService,
    private auth: AngularFireAuth,
    private dbstore: AngularFirestore
  ) {
    this.productCollectionGroup = this.dbstore.collectionGroup('shopping');
    this.orderCollection = this.dbstore.collection('orders');

    // get data in localstorage
    let cartData = localStorage.getItem('cart_items');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length
    }

    this.shopping.cartData.subscribe((items) => {
      this.cartItems = items.length
    })

    // get data of logged in user
    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      if (userAuth.uid) {
        const userDoc = this.dbstore.collection('users').doc(userIDAuth).valueChanges();
        userDoc.subscribe((data) => {
          this.userData = data;
        })
      }
    });

    this.auth.onAuthStateChanged((userAuth) => {
      const userIDAuth = userAuth.uid;
      const dataRequest = this.dbstore.collection('orders', (ref) => ref.where('userID', '==', userIDAuth)).snapshotChanges();
      dataRequest.subscribe( data => {
        this.cartsUser = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Cart)
          }
        })
        const quantityTotal  = this.cartsUser.reduce((prevVal, currentQty) => {
          return prevVal + currentQty.quantity
        }, 0);
        this.totalQty = quantityTotal;
        const calutPriceTotal = this.cartsUser.reduce((prevVal, currentVal) => {
          if(currentVal.quantity > 2) {
            return prevVal + ((currentVal.productData.price - 200) * currentVal.quantity)
          } else {
              return prevVal + (currentVal.productData.price * currentVal.quantity)
          }
        }, 0)
        return this.totalPrice = calutPriceTotal;
      })
    })


  }

  ngOnInit() { }

  onRemoveToOrder(product: string){
    this.shopping.removeToOrder(product)
  }

  goToCheckout(){ this.router.navigate(['checkout']) }

  logout = () => this.authService.logout();

  isAuthenticated = () => this.authService.isLoggedin();

}
