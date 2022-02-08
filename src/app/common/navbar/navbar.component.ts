import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/auth/firebase-auth.service';
import { ShopUser } from 'src/app/models/ShopUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: ShopUser | null = null;
  private userSub: Subscription | null = null;

  constructor(private authService: FirebaseAuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.appUser$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
