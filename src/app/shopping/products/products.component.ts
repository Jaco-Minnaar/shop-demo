import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, subscribeOn, Subscription, tap } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$?: Observable<Product[]>;
  productCategories$?: Observable<ProductCategory[]>;

  userCart?: Cart | null;

  categoryFormControl = new FormControl('-1');
  changeSub?: Subscription;
  routeSub?: Subscription;
  cartSub?: Subscription;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.changeSub?.unsubscribe();
    this.routeSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe((paramMap) => {
      const newCategory = paramMap['category'] ?? -1;

      console.log(newCategory);
      console.log(parseInt(newCategory.toString()));
      this.categoryFormControl.setValue(parseInt(newCategory));

      this.products$ = this.productService.list$.pipe(
        map((products) =>
          newCategory >= 0
            ? products.filter((p) => p.categoryId === newCategory)
            : products
        )
      );
    });

    this.productCategories$ = this.productCategoryService.list$;

    this.changeSub = this.categoryFormControl.valueChanges.subscribe(() => {
      const newCategory = this.categoryFormControl.value.toString();

      const queryParams = newCategory != -1 ? { category: newCategory } : {};
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
      });
    });

    this.cartSub = this.cartService.userCart$.subscribe(
      (cart) => (this.userCart = cart)
    );
  }

  async modifyCart(productId: string, amount: number): Promise<void> {
    if (!this.userCart) return;

    if (!this.userCart.items) this.userCart.items = {};

    if (this.userCart.items[productId] === undefined) {
      this.userCart.items[productId] = 0;
    }

    this.userCart.items[productId] = this.userCart.items[productId] + amount;

    if (this.userCart.items[productId] === 0) {
      delete this.userCart.items[productId];
    }

    await this.cartService.update(this.userCart);
  }
}
