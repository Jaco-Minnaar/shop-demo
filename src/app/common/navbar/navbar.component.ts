import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/auth/firebase-auth.service';
import { countTotalProductsInMap } from 'src/app/helpers/cart-helpers';
import { Cart } from 'src/app/models/Cart';
import { ShopUser } from 'src/app/models/ShopUser';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: ShopUser | null;
  cart?: Cart | null;

  get cartItemsTotal(): number {
    if (!this.cart) return 0;

    return countTotalProductsInMap(this.cart.items ?? {});
  }

  private userSub?: Subscription;
  private cartSub?: Subscription;

  constructor(
    private authService: FirebaseAuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.appUser$.subscribe(
      (user) => (this.user = user)
    );

    this.cartSub = this.cartService.userCart$.subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    location.reload();
  }
}
