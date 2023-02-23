import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import Swal from 'sweetalert2';
import * as AOS from "aos"

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  title = 'Weni Store - Acceuil';
  products!: Product[];
  allProducts!: Product[];
  userID!: string;
  quantity: number = 0;

  constructor(
    private titleService:Title,
    public productService: ProductsService,
    public shopCartService: ShoppingCardService,
    private activeRoute: ActivatedRoute,
    public router: Router
  ) {

  }

  ngOnInit() {
    AOS.init();
    this.titleService.setTitle(this.title);
    this.productService.getProducts().subscribe((res) => {
      this.products = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Product),
        };
      });
    });
  }


  // onAddToShoppingCart(product: Product, userID: string): void {
  //   const qteProduct = (product.quantity += 1);
  //   product.isMyProduct = true;
  //   this.shopCartService.addToMyCart(product, userID, qteProduct);
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top',
  //     showConfirmButton: false,
  //     timer: 800,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer)
  //       toast.addEventListener('mouseleave', Swal.resumeTimer)
  //     }
  //   })
  //   Toast.fire({
  //     icon: 'success',
  //     title: product.name + ' ajouté au panier'
  //   })
  // }

}
