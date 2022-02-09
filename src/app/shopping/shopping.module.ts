import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingRouterModule } from './shopping-router.module';
import { SharedModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartTableComponent } from './cart/cart-table/cart-table.component';

@NgModule({
  declarations: [CartComponent, ProductsComponent, CartTableComponent],
  imports: [
    CommonModule,
    ShoppingRouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingModule {}
