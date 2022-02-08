import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  child,
  Database,
  DataSnapshot,
  get,
  object,
  query,
  ref,
  update,
} from '@angular/fire/database';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { ShopUser } from '../models/ShopUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Database) {}

  save(user: User): Observable<void> {
    const dbRef = ref(this.db);

    return from(get(child(dbRef, `/users/${user.uid}`))).pipe(
      map<DataSnapshot, ShopUser | null>((snapshot) => snapshot.val()),
      map((shopUser) => shopUser?.isAdmin ?? false),
      switchMap((isAdmin) => {
        const shopUser: ShopUser = {
          uid: user.uid,
          email: user.email ?? '',
          emailVerified: user.emailVerified,
          photoUrl: user.photoURL,
          providerId: user.providerId,
          displayName: user.displayName,
          isAdmin: isAdmin,
        };

        return from(update(ref(this.db), { [`/users/${user.uid}`]: shopUser }));
      })
    );
  }

  get(uid: string): Observable<ShopUser | null> {
    return object(ref(this.db, `/users/${uid}`)).pipe(
      map((change) => {
        console.log(change.snapshot.key);
        return change.snapshot.val();
      })
    );
  }
}
