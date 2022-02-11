import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingRouterModule } from './shopping-router.module';
import { SharedModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartTableComponent } from './cart/cart-table/cart-table.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListCardComponent } from './checkout/product-list-card/product-list-card.component';
import { ShippingFormComponent } from './checkout/shipping-form/shipping-form.component';
import { OrderInfoComponent } from './order-info/order-info.component';

@NgModule({
  declarations: [
    CartComponent,
    ProductsComponent,
    CartTableComponent,
    CheckoutComponent,
    ProductListCardComponent,
    ShippingFormComponent,
    OrderInfoComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingModule {}
