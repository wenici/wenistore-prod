import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { InCartComponent } from './in-cart/in-cart.component';
import { SuccesComponent } from './succes/succes.component';
import { ShopPageComponent } from '../shop/shop.component';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'angular-crumbs';

@NgModule({
  declarations: [ShopPageComponent, ProductsComponent, InCartComponent, SuccesComponent],
  imports: [ShopRoutingModule, CommonModule, BreadcrumbModule],
  bootstrap: [ShopPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopModule {

}
