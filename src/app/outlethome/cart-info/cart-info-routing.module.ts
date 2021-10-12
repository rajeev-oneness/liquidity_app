import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartInfoPage } from './cart-info.page';

const routes: Routes = [
  {
    path: '',
    component: CartInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartInfoPageRoutingModule {}
