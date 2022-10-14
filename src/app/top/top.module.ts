import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top.component';
import { TopFunComponent } from './top-fun/top-fun.component';
import { TopInformatiqueComponent } from './top-informatique/top-informatique.component';
import { TopModeHommeComponent } from './top-mode-homme/top-mode-homme.component';
import { TopModeFemmeComponent } from './top-mode-femme/top-mode-femme.component';
import { TopSoinBeauteComponent } from './top-soin-beaute/top-soin-beaute.component';
import { TopSupermarcheComponent } from './top-supermarche/top-supermarche.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../layouts/footer/footer.component';

@NgModule({
  declarations: [
    TopComponent,
    TopFunComponent,
    TopInformatiqueComponent,
    TopModeHommeComponent,
    TopModeFemmeComponent,
    TopSoinBeauteComponent,
    TopSupermarcheComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TopRoutingModule
  ],
  exports: [
    TopComponent,
    TopFunComponent,
    TopInformatiqueComponent,
    TopModeHommeComponent,
    TopModeFemmeComponent,
    TopSoinBeauteComponent,
    TopSupermarcheComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class TopModule { }
