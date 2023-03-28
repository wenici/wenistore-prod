import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopModule } from '../app/top/top.module';

import { SwiperModule } from 'swiper/angular'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { AuthService } from './shared/services/auth/auth.service';

import { ShopModule } from './shop/shop.module';
import{ Ng2SearchPipeModule }from'ng2-search-filter';
import { MaterialModule } from './layouts/material.module';
import { FilterProductsModule } from './filter-products/filter-products.module'

import { BreadcrumbModule } from 'angular-crumbs';

import { HeaderComponent } from './layouts/header/header.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoFoundPageComponent } from './error/no-found-page/no-found-page.component';
import { CreateComponent } from './admin/create/create.component'
import { ShopComponent } from './components/shop/shop.component';
import { PaymentComponent } from './components/shop/checkout/payment/payment.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { OrdersComponent } from './components/shop/orders/orders.component';
import { UserProfilImgComponent } from './auth/user-profil-img/user-profil-img.component';
import { AllComponent } from './admin/all/all.component';
import { ProductsService } from './shared/services/products.service';
import { ShoppingCardService } from './shared/services/shopping-card.service';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RegisterShopComponent } from './admin/register-shop/register-shop.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { AccesNoDediedComponent } from './error/acces-no-dedied/acces-no-dedied.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UpdateProductComponent,
    DetailsProductComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    NoFoundPageComponent,
    ShopComponent,
    PaymentComponent,
    CheckoutComponent,
    OrdersComponent,
    UserProfilImgComponent,
    AllComponent,
    CreateComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    RegisterShopComponent,
    RegisterAdminComponent,
    AccesNoDediedComponent,
   ],
   entryComponents: [
    LoginComponent
  ],
  imports: [
    TopModule,
    FormsModule,
    SwiperModule,
    Ng2SearchPipeModule,
    ShopModule,
    FilterProductsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [ Title,
    { provide: LOCALE_ID, useValue: 'fr', },
    AuthService,
    ProductsService,
    ShoppingCardService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
