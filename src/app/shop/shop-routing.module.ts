import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopPageComponent } from './shop.component';
import { ProductsComponent } from './products/products.component';
import { InCartComponent } from './in-cart/in-cart.component';
import { SuccesComponent } from './succes/succes.component';

import { AdminGuard } from '../shared/guard/admin.guard';
import { ShopGuard } from '../shared/guard/shop.guard';

const routes: Routes = [
  {
    path: 'shop-page',
    component: ShopPageComponent,
    canActivate: [AdminGuard || ShopGuard],
    children: [
      { path: 'products', component: ProductsComponent, data: { breadcrumb: 'Produits' } },
      { path: 'in-cart', component: InCartComponent , data: { breacrumb: 'Au panier' } },
      { path: 'succes', component: SuccesComponent, data: { breadcrumb: 'Succès' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
