import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { cartKeys } from 'src/app/helpers/cart-helpers';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent implements OnInit, OnDestroy {
  @Input('cart') cart?: Cart | null;

  products?: { [id: string]: Product };

  private productsSub?: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }

  get cartProductKeys(): string[] {
    if (!this.cart) return [];

    return cartKeys(this.cart);
  }

  get totalPrice(): number {
    if (!this.cart || !this.products) return 0;

    return this.cartProductKeys.reduce(
      (runningSum, key) => runningSum + (this.products?.[key].price ?? 0),
      0
    );
  }

  calculatePrice(productKey: string): number {
    if (!this.cart || !this.products || !this.cart.items) return 0;

    return this.products[productKey].price * this.cart.items[productKey];
  }

  async modifyCart(productId: string, amount: number): Promise<void> {
    if (!this.cart || !this.cart.items) return;

    if (this.cart.items[productId] === undefined) {
      this.cart.items[productId] = 0;
    }

    this.cart.items[productId] = this.cart.items[productId] + amount;

    if (this.cart.items[productId] === 0) {
      delete this.cart.items[productId];
    }

    await this.cartService.update(this.cart);
  }

  ngOnInit(): void {
    this.productsSub = this.productService.list$
      .pipe(
        map((products) =>
          products.reduce(
            (productDictionary, product) => ({
              ...productDictionary,
              [product.id]: product,
            }),
            {}
          )
        )
      )
      .subscribe((products) => (this.products = products));
  }
}
