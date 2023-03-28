import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  quantity: number = 0;

  constructor(
    public productService: ProductsService,
    public shopping: ShoppingCardService,
    public router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Product),
        };
      });
    });
  }

  goToDetailsProduct(productId?: string): void {
    this.router.navigate(['product-details', productId]);
    console.log(productId);
  }
}
