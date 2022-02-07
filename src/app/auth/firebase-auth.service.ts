import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  User,
} from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  user$: Observable<User | null>;
  constructor(private auth: Auth) {
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
