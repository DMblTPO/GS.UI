import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '@app/models';
import { currentUserStor, GameStoreState } from '@app/store';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private currentUser: User = null;

  constructor(private readonly router: Router, private readonly store: Store<GameStoreState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select(currentUserStor).subscribe((user) => (this.currentUser = user));
    if (this.currentUser) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
