import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Database, ref, update } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { ShopUser } from '../models/ShopUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Database) {}

  save(user: ShopUser): Observable<void> {
    return from(update(ref(this.db), { [`/users/${user.uid}`]: user }));
  }
}
