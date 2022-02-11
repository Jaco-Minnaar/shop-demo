import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { map, Subscription } from 'rxjs';
import { countTotalProductsInMap, mapKeys } from 'src/app/helpers/cart-helpers';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { StringLiteralLike } from 'typescript';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.scss'],
})
export class ProductListCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input('cart') cart?: Cart;

  products?: Product[];

  cartItemsWithProducts: CartItemWithProduct[] = [];
  private subs: Subscription[] = [];

  constructor(private productService: ProductService) {}

  get totalCartItems(): number {
    return countTotalProductsInMap(this.cart?.items ?? {});
  }

  get cartProductKeys(): string[] {
    return mapKeys(this.cart?.items ?? {});
  }

  get cartTotalPrice(): number {
    return this.cartItemsWithProducts.reduce(
      (sum, current) => sum + this.calculateProductTotalPrice(current),
      0
    );
  }

  calculateProductTotalPrice(cartItem: CartItemWithProduct): number {
    return cartItem.amount * cartItem.product.price;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const productSub = this.productService.list$
      .pipe(
        map((products) => {
          const productMap: { [id: string]: Product } = products.reduce(
            (productDictionary, product) => ({
              ...productDictionary,
              [product.id]: product,
            }),
            {}
          );

          return this.cartProductKeys.map(
            (key): CartItemWithProduct => ({
              amount: this.cart?.items ? this.cart.items[key] ?? 0 : 0,
              product: productMap[key],
            })
          );
        })
      )
      .subscribe((cartItems) => (this.cartItemsWithProducts = cartItems));

    this.subs.push(productSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

interface CartItemWithProduct {
  amount: number;
  product: Product;
}
