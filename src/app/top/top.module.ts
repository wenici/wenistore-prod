import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../layouts/material.module';


import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';

@NgModule({
  declarations: [
    TopComponent,
    SidebarComponent,
    FooterComponent,
    FilterProductsComponent
  ],
  imports: [
    CommonModule,
    TopRoutingModule,
    MaterialModule
  ],
  exports: [
    TopComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class TopModule { }
