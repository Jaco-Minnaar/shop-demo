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
import { AdminProductInfoComponent } from './admin/admin-product-info/admin-product-info.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [AuthGuard, AuthAdminGuard],
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
