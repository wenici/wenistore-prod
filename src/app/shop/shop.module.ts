import { NgModule } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { InCartComponent } from './in-cart/in-cart.component';
import { SuccesComponent } from './succes/succes.component';

@NgModule({
  declarations: [ShopComponent, ProductsComponent, InCartComponent, SuccesComponent],
  imports: [ShopRoutingModule],
  bootstrap: [ShopComponent],
})
export class ShopModule {

}
