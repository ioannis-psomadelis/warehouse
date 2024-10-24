import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAdmin = this.authService.isAdmin();
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      if (state.url === '/login') {
        return isAdmin
          ? this.router.createUrlTree(['/admin-dashboard'])
          : this.router.createUrlTree(['/user-dashboard']);
      }

      if (isAdmin) {
        if (state.url === '/user-dashboard') {
          return this.router.createUrlTree(['/admin-dashboard']);
        }
        return true;
      } else {
        if (state.url === '/admin-dashboard') {
          return this.router.createUrlTree(['/user-dashboard']);
        }
        return true;
      }
    }

    if (state.url !== '/login') {
      return this.router.createUrlTree(['/login']);
    }
    return true;
  }
}
