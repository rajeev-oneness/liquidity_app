import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartInfoPageRoutingModule } from './cart-info-routing.module';

import { CartInfoPage } from './cart-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartInfoPageRoutingModule
  ],
  declarations: [CartInfoPage]
})
export class CartInfoPageModule {}
