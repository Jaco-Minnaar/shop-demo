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
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  zip,
} from 'rxjs';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { Cart } from '../models/Cart';
import { ShopUser } from '../models/ShopUser';

const CART_ID_KEY = 'cart_id';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly path = '/carts';

  get userCart$(): Observable<Cart> {
    return this.authService.appUser$.pipe(
      switchMap((user) => {
        if (!user) {
          console.log('no logged in user');
          return this.getCart(this.getOrCreateCartId()).pipe(
            switchMap((cart) => {
              if (!cart || cart.uid) {
                const newCartId = this.createNew();
                this.setCart(newCartId);
                return this.getCart(newCartId);
              }
              return of(cart);
            })
          );
        }

        return this.generateUserCart(user);
      }),
      map((cart) => {
        if (!cart) throw new Error('Cart is null');

        return cart;
      })
    );
  }

  constructor(private db: Database, private authService: FirebaseAuthService) {}

  private mergeCarts(cart1: Cart, cart2: Cart, id: string, uid: string) {
    const workingCart: Cart = {
      id,
      uid,
    };

    cart1.items ??= {};
    cart2.items ??= {};

    const combinedKeys = Array.from(
      new Set(
        Object.keys(cart1.items ?? []).concat(Object.keys(cart2.items ?? []))
      )
    );

    if (combinedKeys.length > 0) {
      workingCart.items = {};

      for (const key of combinedKeys) {
        const amount1 = cart1.items[key] ?? 0;
        const amount2 = cart2.items[key] ?? 0;

        workingCart.items[key] = amount1 + amount2;
      }
    }

    return workingCart;
  }

  private generateUserCart(user: ShopUser): Observable<Cart | null> {
    return this.getCartFromUid(user.uid).pipe(
      switchMap((userCart) => {
        if (!userCart) {
          return this.getCart(this.getOrCreateCartId());
        }

        const storedId = this.getStoredCartId();

        if (!storedId || userCart.id === storedId) {
          return of(userCart);
        }

        console.log(storedId);
        return this.getCart(storedId).pipe(
          take(1),
          switchMap((cart) => {
            if (!cart) {
              console.error('storedId cart does not exist');
              return of(userCart);
            }

            cart.items ??= {};

            if (!userCart) {
              if (cart.uid === '' || cart.uid === user.uid) {
                return of(cart);
              }

              return this.getCart(this.createNew(user.uid));
            }

            if (userCart && cart.uid !== '' && cart.uid !== user.uid) {
              return of(userCart);
            }

            const mergedCart = this.mergeCarts(
              userCart,
              cart,
              userCart.id,
              user.uid
            );

            this.setCart(mergedCart.id);

            return from(
              this.deleteCart(cart.id)
                .then(() => this.update(mergedCart))
                .then(() => mergedCart)
            );
          })
        );
      })
    );
  }

  private getCartFromUid(uid: string): Observable<Cart | null> {
    return list(
      query(ref(this.db, this.path), orderByChild('uid'), equalTo(uid))
    ).pipe(map((changes) => changes[0]?.snapshot.val() ?? null));
  }

  private getStoredCartId(): string | null {
    return localStorage.getItem(CART_ID_KEY);
  }

  private getOrCreateCartId(uid?: string): string {
    const existingCartId = this.getStoredCartId();

    console.log('existing cart id:', existingCartId);

    if (existingCartId) return existingCartId;

    const newCartId = this.createNew(uid);
    this.setCart(newCartId);

    return newCartId;
  }

  private setCart(cartId: string) {
    localStorage.setItem(CART_ID_KEY, cartId);
  }

  private deleteCart(id: string): Promise<void> {
    return remove(ref(this.db, `${this.path}/${id}`));
  }

  private getCart(id: string): Observable<Cart | null> {
    return object(ref(this.db, `${this.path}/${id}`)).pipe(
      map((item) => item.snapshot.val())
    );
  }

  private createNew(uid?: string): string {
    console.log('creating new cart');
    const newId = push(child(ref(this.db), this.path)).key;

    if (!newId) {
      throw new Error('Failed to create new cart');
    }

    const newCart: Cart = {
      id: newId,
      items: {},
      uid: uid ?? '',
    };

    this.update(newCart);

    return newId;
  }

  update(cart: Cart): Promise<void> {
    return update(ref(this.db), { [`${this.path}/${cart.id}`]: cart });
  }

  clearCart(cart: Cart): Promise<void> {
    cart.items = {};
    return this.update(cart);
  }
}
