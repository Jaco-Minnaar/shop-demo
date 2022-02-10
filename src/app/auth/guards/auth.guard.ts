import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseAuthService } from '../firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.guard(state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.guard(state);
  }

  private guard(
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user$.pipe(
      map((user) => {
        if (user) return true;

        return this.router.createUrlTree(['login'], {
          queryParams: { returnUrl: state.url },
        });
      })
    );
  }
}
