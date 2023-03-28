import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../layouts/material.module';
import { FilterProductsComponent } from './filter-products.component';
import { FilterProductsRoutingModule } from './filter-products.routing.module';
import { PhonesComponent } from './categories/phones/phones.component';
import { ChaussuresComponent } from './categories/chaussures/chaussures.component';
import { ModeFemmeComponent } from './categories/mode-femme/mode-femme.component';
import { ModeHommeComponent } from './categories/mode-homme/mode-homme.component';
import { VetementsComponent } from './categories/vetements/vetements.component';
import { LayoutsComponent } from './layouts/layouts.component';

import { BreadcrumbModule } from 'angular-crumbs';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    PhonesComponent,
    LayoutsComponent,
    ModeFemmeComponent,
    ModeHommeComponent,
    VetementsComponent,
    ChaussuresComponent,
    FilterProductsComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BreadcrumbModule,
    FilterProductsRoutingModule
  ],
  exports: [
    FilterProductsComponent
  ],
  bootstrap: [FilterProductsComponent],
})
export class FilterProductsModule { }
