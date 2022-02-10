import { Injectable } from '@angular/core';
import {
  child,
  Database,
  list,
  object,
  query,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { equalTo, orderByChild, push } from 'firebase/database';
import {
  first,
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly path = '/carts';
  private currentCartId?: string;

  get userCart$(): Observable<Cart | null> {
    return this.authService.appUser$.pipe(
      switchMap((user) => {
        if (!user) {
          console.log('no user');
          if (!this.currentCartId) {
            return this.createNew();
          }

          return this.getCart(this.currentCartId);
        }

        return list(
          query(ref(this.db, this.path), orderByChild('uid'), equalTo(user.uid))
        ).pipe(
          map((changes) => changes[0]?.snapshot.val() ?? null),
          switchMap((userCart: Cart | null) => {
            if (this.currentCartId && this.currentCartId !== userCart?.id) {
              return from(
                firstValueFrom(this.getCart(this.currentCartId))
              ).pipe(
                switchMap((cart) => {
                  if (!cart) {
                    // TODO: If cart from currentCartId doesn't exist somehow, create new cart
                    console.error('currentCartId cart does not exist');
                    return of(null);
                  }

                  cart.items ??= {};

                  if (!userCart) {
                    if (cart.uid === '' || cart.uid === user.uid) {
                      return of(cart);
                    }

                    return this.createNew(user.uid);
                  }

                  if (userCart && cart.uid !== '' && cart.uid !== user.uid) {
                    return of(userCart);
                  }

                  const workingCart: Cart = {
                    id: userCart.id,
                    uid: user.uid,
                  };
                  userCart.items ??= {};
                  const combinedKeys = Array.from(
                    new Set(
                      Object.keys(userCart.items ?? []).concat(
                        Object.keys(cart.items ?? [])
                      )
                    )
                  );

                  if (combinedKeys.length > 0) {
                    workingCart.items = {};

                    for (const key of combinedKeys) {
                      const amount1 = cart.items[key] ?? 0;
                      const amount2 = userCart.items[key] ?? 0;

                      workingCart.items[key] = amount1 + amount2;
                    }
                  }

                  this.currentCartId = workingCart.id;
                  this.deleteCart(cart.id)
                    .then(() => this.update(workingCart))
                    .catch((err) => console.error(err));

                  return of(workingCart);
                })
              );
            }

            if (!userCart) {
              console.log('no existing cart id');
              return this.createNew(user.uid);
            }

            return of(userCart);
          })
        );
      }),
      map((cart) => {
        if (cart && !cart.items) {
          cart.items = {};
        }

        return cart;
      })
    );
  }

  constructor(private db: Database, private authService: FirebaseAuthService) {
    this.currentCartId = localStorage.getItem('cart_id') ?? undefined;
    localStorage.removeItem('cart_id');

    this.authService.subscribe(() => {
      if (this.currentCartId)
        localStorage.setItem('cart_id', this.currentCartId);
    });
  }

  private deleteCart(id: string): Promise<void> {
    return remove(ref(this.db, `${this.path}/${id}`));
  }

  private getCart(id: string): Observable<Cart | null> {
    return object(ref(this.db, `${this.path}/${id}`)).pipe(
      map((item) => item.snapshot.val())
    );
  }

  private createNew(uid?: string): Observable<Cart | null> {
    console.log('creating new cart');
    const newId = push(child(ref(this.db), this.path)).key;

    if (!newId) {
      console.error('Failed to create new cart');
      return of(null);
    }

    this.currentCartId = newId;

    const newCart: Cart = {
      id: newId,
      items: {},
      uid: uid ?? '',
    };

    return from(this.update(newCart)).pipe(
      switchMap(() => object(ref(this.db, `${this.path}/${newId}`))),
      map((item) => item.snapshot.val())
    );
  }

  update(cart: Cart): Promise<void> {
    return update(ref(this.db), { [`${this.path}/${cart.id}`]: cart });
  }

  clearCart(cart: Cart): Promise<void> {
    cart.items = {};
    return this.update(cart);
  }
}
