import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingRouterModule } from './shopping-router.module';

@NgModule({
  declarations: [CartComponent, ProductsComponent],
  imports: [CommonModule, ShoppingRouterModule],
})
export class ShoppingModule {}
