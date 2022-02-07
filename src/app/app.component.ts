import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './auth/firebase-auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    authService: FirebaseAuthService,
    router: Router,
    userService: UserService
  ) {
    authService.user$.subscribe((user) => {
      if (!user) {
        localStorage.removeItem('returnUrl');
        return;
      }

      userService.save({
        uid: user.uid,
        email: user.email ?? '',
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        providerId: user.providerId,
        displayName: user.displayName,
      });

      const returnUrl = localStorage.getItem('returnUrl');

      console.log(returnUrl);
      router.navigateByUrl(returnUrl ?? '');
    });
  }
}
