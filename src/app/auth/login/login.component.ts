import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: FirebaseAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  async login() {
    const returnUrl = (await firstValueFrom(this.route.queryParamMap)).get(
      'returnUrl'
    );
    this.authService.login(returnUrl ?? '');
  }
}
