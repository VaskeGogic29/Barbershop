import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZaposleniPage } from './zaposleni.page';

const routes: Routes = [
  {
    path: '',
    component: ZaposleniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZaposleniPageRoutingModule {}
