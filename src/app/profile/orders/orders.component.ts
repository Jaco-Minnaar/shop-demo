import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';
import { FirebaseAuthService } from 'src/app/auth/firebase-auth.service';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$?: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: FirebaseAuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.authService.appUser$);

    if (user) {
      this.orders$ = this.orderService.getOrdersForUser(user.uid);
    }
  }
}
