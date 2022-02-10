import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouterModule } from './admin-router.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductInfoComponent } from './admin-product-info/admin-product-info.component';
import { AdminProductTableComponent } from './admin-product-table/admin-product-table.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../common/common.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminProductInfoComponent,
    AdminProductTableComponent,
  ],
  imports: [
    CommonModule,
    AdminRouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
