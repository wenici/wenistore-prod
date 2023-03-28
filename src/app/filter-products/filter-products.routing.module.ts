import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterProductsComponent } from './filter-products.component';
import { PhonesComponent } from './categories/phones/phones.component';
import { ChaussuresComponent } from './categories/chaussures/chaussures.component';
import { ModeFemmeComponent } from './categories/mode-femme/mode-femme.component';
import { ModeHommeComponent } from './categories/mode-homme/mode-homme.component';
import { VetementsComponent } from './categories/vetements/vetements.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'filter-products',
    component: FilterProductsComponent,
    children: [
      {
        path: 'all-products',
        component: ProductsComponent,
        data: { breadcrumb: 'Tous les produits' }
      },
      {
        path: 'phones',
        component: PhonesComponent,
        data: { breadcrumb: 'Téléphones et tablettes' }
      },
      {
        path: 'chaussures',
        component: ChaussuresComponent,
        data: { breadcrumb: 'Chaussures' }
      },
      {
        path: 'mode-femme',
        component: ModeFemmeComponent,
        data: { breadcrumb: 'Mode Femme' }
      },
      {
        path: 'mode-homme',
        component: ModeHommeComponent,
        data: { breadcrumb: 'Mode Homme' }
      },
      {
        path: 'vetements',
        component: VetementsComponent,
        data: { breadcrumb: 'Vêtements' }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterProductsRoutingModule { }
