import { Injectable } from '@angular/core';
import {
  child,
  Database,
  equalTo,
  list,
  query,
  ref,
} from '@angular/fire/database';
import { orderByChild } from 'firebase/database';
import { map, Observable } from 'rxjs';
import { Order } from '../models/Order';
import { Service } from './service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends Service<Order> {
  constructor(db: Database) {
    super(db, '/orders');
  }

  getOrdersForUser(uid: string): Observable<Order[]> {
    return list(
      query(ref(this.db, this.path), orderByChild('uid'), equalTo(uid))
    ).pipe(map((changes) => changes.map((change) => change.snapshot.val())));
  }
}
