import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  User,
} from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { ShopUser } from '../models/ShopUser';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  user$: Observable<User | null>;

  get appUser$(): Observable<ShopUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return of(null);

        return this.userService.get(user.uid);
      })
    );
  }

  constructor(private auth: Auth, private userService: UserService) {
    this.user$ = authState(auth);
  }

  login(returnUrl: string) {
    localStorage.setItem('returnUrl', returnUrl);
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
