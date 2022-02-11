import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/auth/firebase-auth.service';
import { Cart } from 'src/app/models/Cart';
import { Order } from 'src/app/models/Order';
import { ShippingInfo } from 'src/app/models/ShippingInfo';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart?: Cart;

  private readonly subs: Subscription[] = [];
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private authService: FirebaseAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cartSub = this.cartService.userCart$.subscribe(
      (cart) => (this.cart = cart)
    );
    this.subs.push(cartSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  async submitOrder(shippingInfo: ShippingInfo) {
    if (!this.cart) return;

    const user = await firstValueFrom(this.authService.appUser$);

    if (!user) return;

    const order: Order = {
      id: '',
      uid: user.uid,
      shipping: shippingInfo,
      items: this.cart.items ?? {},
      date: Date.now(),
    };

    const newId = await this.orderService.createItem(order);

    await this.cartService.clearCart(this.cart);

    await this.router.navigate(['../order', newId], {
      relativeTo: this.route,
    });
  }
}
