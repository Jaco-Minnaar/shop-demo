import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
        console.log('no logged in user');
        return;
      }

      firstValueFrom(userService.save(user))
        .then(() => {
          console.log('save success');
          const returnUrl = localStorage.getItem('returnUrl');
          localStorage.removeItem('returnUrl');

          if (returnUrl) {
            router.navigateByUrl(returnUrl);
          }
        })
        .catch((err) => console.error(err));
    });
  }
}
