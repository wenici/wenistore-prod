import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/database/user.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  userID: string | undefined;
  quantity: number = 0;
  products!: Product[];
  filterByName: any;
  currentUserData?: User | undefined;

  constructor(
    public router: Router,
    private authService: AuthService,
    public productService: ProductsService
  ) {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Product),
        };
      });
    });
   }
  
   ngOnInit() {}
   
   goToDetailsProduct(productId?: string): void {
     this.router.navigate(['product-details', productId]);
     console.log(productId);
   }
   
  logout = () => this.authService.logout();

  isAuthenticated = () => this.authService.isLoggedin();

}