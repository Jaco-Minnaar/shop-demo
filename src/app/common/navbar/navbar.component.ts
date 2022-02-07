import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { FirebaseAuthService } from 'src/app/auth/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  get user$(): Observable<User | null> {
    return this.authService.user$;
  }

  constructor(private authService: FirebaseAuthService) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
