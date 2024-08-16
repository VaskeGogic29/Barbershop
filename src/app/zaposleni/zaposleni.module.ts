import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZaposleniPageRoutingModule } from './zaposleni-routing.module';

import { ZaposleniPage } from './zaposleni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZaposleniPageRoutingModule
  ],
  declarations: [ZaposleniPage]
})
export class ZaposleniPageModule {}
