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

import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';

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

  userData: User[]
  carts: Cart[];
  cartsUser: Cart[];
  cartsLocal: CartLocal[];

  isAdmin: boolean = true;
  isShop: boolean;
  isUser: boolean;

  removeCart : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private shopping: ShoppingCardService,
    private titleService: Title,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private dbstore: AngularFirestore,
    private breadcrumb: BreadcrumbService
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
    this.breadcrumb.breadcrumbChanged.subscribe( crumbs => {
      this.titleService.setTitle(this.createTitle(crumbs));
    })
    this.titleService.setTitle(this.title);
    let productId= this.route.snapshot.paramMap.get('productId');
    productId && this.productService.getDetailProduct(productId).subscribe((data) => {
      this.product = data;
    })
    this.auth.authState.subscribe( user => {
      const userID = user.uid;
      const data = this.dbstore.collection('users',
        (ref) => ref.where('userID', '==', userID).where('role', '==', this.isAdmin)).snapshotChanges()
        if(data) this.isAdmin = true
        data.subscribe(adminData => {
          this.userData = adminData.map((e) => {
            return {
              id: e.payload.doc.id,
              ...(e.payload.doc.data() as User)
            }
          })
        })
    })
    this.goToCategory()
  }

  // <option value="Informatique">Informatique</option>
  // <option value="Téléphone">Téléphone</option>
  // <option value="Pharmacie">Pharmacie</option>
  // <option value="Sport">Sport</option>
  // <option value="Supermarché">Supermarché</option>
  // <option value="Nourriture">Nourriture</option>
  // <option value="Vêtements">Vêtements</option>
  // <option value="Chaussure">Chaussure</option>
  // <option value="Modehomme">Mode Homme</option>
  // <option value="Modefemme">Mode Femme</option>

  goToCategory(): void {
    const CATEGORY = this.product.category;
    if(CATEGORY === 'Téléphone') { this.router.navigate(['filter-products/phones']); }
    else if(CATEGORY === 'Vêtements') { this.router.navigate(['filter-products/vetements'])}
    // console.log(CATEGORY);

  }

  private createTitle(routesCollection: Breadcrumb[])  {
    const title = 'Filtrage de produits';
    const titles = routesCollection.filter((route) => route.displayName)
    if(!titles.length) { return title }
    const routeTitle = this.titlesRoutes(titles);
    return `${routeTitle} ${title}`
  }

  private titlesRoutes(titles: any[]) {
    return titles.reduce((prev, curr) => {
      return `${curr.displayName} - ${prev}`;
    }, '');
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

  async onAddToOrder(): Promise<void>{
    const userID = (await this.auth.currentUser).uid;
    if(this.isAuthenticated) {
      this.shopping.addToOrder(this.product, this.product.quantity, userID)
    }
  }

  onAddToOrderInLoaclStorage(){
    const productId = this.route.snapshot.paramMap.get('productId');
    const dataCart:  CartLocal = {
      id: productId,
      productData: this.product,
      createdAt: new Date()
    }
    if(dataCart) {
      dataCart.productData.quantity = this.product.quantity;
      console.log(dataCart);
      this.shopping.addToLocalStorage(dataCart);
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    Toast.fire({
      icon: 'success',
      title: 'Produit ajouté au panier',
    });
    window.location.reload();
  }

  removeOrderInLocalStorage(): void {}

  incrementProduct(): void {
    const qty = this.product.quantity
    this.product.quantity = qty + 1;
    console.log(this.product.quantity);
  }

  desecrementProduct(): void {
    const qty = this.product.quantity;
    if(qty == 1) {
      this.product.quantity = 1
    } else {
      this.product.quantity = qty - 1;
    }
    console.log(this.product.quantity);
  }
}
