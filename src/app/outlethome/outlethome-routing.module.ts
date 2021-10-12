import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutlethomePage } from './outlethome.page';

const routes: Routes = [
  {
    path: '',
    component: OutlethomePage
  },
  {
    path: 'cart-info',
    loadChildren: () => import('./cart-info/cart-info.module').then( m => m.CartInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutlethomePageRoutingModule {}
