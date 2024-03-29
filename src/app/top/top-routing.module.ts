import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './top.component';
const routes: Routes = [
  { path: 'acceuil', component: TopComponent, data: { breadcrumb: 'Acceuil' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopRoutingModule { }
