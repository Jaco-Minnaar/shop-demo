import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './shopping/cart/cart.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './shopping/products/products.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthAdminGuard } from './auth/guards/auth-admin.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'shopping-cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'profile/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
