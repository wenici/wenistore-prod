import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoFoundPageComponent } from './error/no-found-page/no-found-page.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';

import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { OrdersComponent } from './components/shop/orders/orders.component';

import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './admin/create/create.component';

import { AuthGuardService } from './shared/guard/auth-guard.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { RegisterShopComponent } from './admin/register-shop/register-shop.component';

import { AdminGuard } from './shared/guard/admin.guard';
import { ShopGuard } from './shared/guard/shop.guard';
import { AccesNoDediedComponent } from './error/acces-no-dedied/acces-no-dedied.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full'
  },
  {
    path: 'admin/create',
    component: CreateComponent,
    canActivate: [AuthGuardService, AdminGuard || ShopGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product-details/:productId',
    component: DetailsProductComponent,
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./top/top.module').then(m => m.TopModule)
  },
  {
    path: 'admin/register-admin',
    component: RegisterAdminComponent,
  },
  {
    path: 'auth/register-shop',
    component: RegisterShopComponent
  },
  {
    path: 'error/acces-no-dedied',
    component: AccesNoDediedComponent
  },
  {
    path: '**',
    component: NoFoundPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
