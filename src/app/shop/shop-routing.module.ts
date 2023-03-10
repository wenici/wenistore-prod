import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductsComponent } from './products/products.component';
import { InCartComponent } from './in-cart/in-cart.component';
import { SuccesComponent } from './succes/succes.component';

const routes: Routes = [
  {
    path: 'shop-page',
    component: ShopComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'in-cart', component: InCartComponent },
      { path: 'succes', component: SuccesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
