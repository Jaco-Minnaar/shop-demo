import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { countTotalProductsInMap } from 'src/app/helpers/cart-helpers';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart?: Cart | null;

  private cartSub?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.userCart$.subscribe(
      (cart) => (this.cart = cart)
    );
  }

  get itemCount(): number {
    return this.cart ? countTotalProductsInMap(this.cart.items ?? {}) : 0;
  }

  async clearCart() {
    if (!this.cart) return;

    if (confirm('Are you sure you want to clear all items in your cart?')) {
      await this.cartService.clearCart(this.cart);
    }
  }
}
