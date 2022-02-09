import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductInfoComponent } from './admin-product-info/admin-product-info.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
  {
    path: 'orders',
    component: AdminOrdersComponent,
  },
  {
    path: 'products',
    component: AdminProductsComponent,
  },
  {
    path: 'products/new',
    component: AdminProductInfoComponent,
  },
  {
    path: 'products/:id',
    component: AdminProductInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRouterModule {}
