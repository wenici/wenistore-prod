import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './top.component';

import { TopFunComponent } from './top-fun/top-fun.component';
import { TopInformatiqueComponent } from './top-informatique/top-informatique.component';
import { TopModeHommeComponent } from './top-mode-homme/top-mode-homme.component';
import { TopModeFemmeComponent } from './top-mode-femme/top-mode-femme.component';
import { TopSoinBeauteComponent } from './top-soin-beaute/top-soin-beaute.component';
import { TopSupermarcheComponent } from './top-supermarche/top-supermarche.component';

const routes: Routes = [
  { path: 'acceuil', component: TopComponent },
  {
    path: 'top-fun',
    component: TopFunComponent,
  },
  {
    path: 'top-informatique',
    component: TopInformatiqueComponent,
  },
  {
    path: 'top-homme',
    component: TopModeHommeComponent,
  },
  {
    path: 'top-femme',
    component: TopModeFemmeComponent,
  },
  {
    path: 'top-soin-beaute',
    component: TopSoinBeauteComponent,
  },
  {
    path: 'top-supermarche',
    component: TopSupermarcheComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopRoutingModule { }
