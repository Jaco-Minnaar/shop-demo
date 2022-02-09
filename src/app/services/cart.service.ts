import { Injectable } from '@angular/core';
import { Database, list, query, ref, update } from '@angular/fire/database';
import { equalTo, orderByChild } from 'firebase/database';
import {
  first,
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly path = '/carts';
  get userCart$(): Observable<Cart | null> {
    return from(firstValueFrom(this.authService.appUser$)).pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }

        return list(
          query(ref(this.db, this.path), orderByChild('uid'), equalTo(user.uid))
        );
      }),
      map((items) =>
        items ? items.map((item) => item.snapshot.val()).shift() ?? null : null
      ),
      map((cart) => {
        if (cart && !cart.items) {
          cart.items = {};
        }

        return cart;
      })
    );
  }

  constructor(private db: Database, private authService: FirebaseAuthService) {}

  update(cart: Cart): Promise<void> {
    return update(ref(this.db), { [`${this.path}/${cart.id}`]: cart });
  }
}
