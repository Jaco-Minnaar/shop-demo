import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FirebaseAuthService } from '../firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService,
    private authService: FirebaseAuthService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.guard();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.guard();
  }

  private guard(): Observable<boolean> {
    return this.authService.appUser$.pipe(
      map((shopUser) => {
        if (!shopUser || !shopUser.isAdmin) return false;

        return true;
      })
    );
  }
}
