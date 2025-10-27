import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectAccessToken } from '../../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store,
        private router: Router
    ) { }

    canActivate() {
        return this.store.select(selectAccessToken).pipe(
            take(1),
            map(token => {
                if (token) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
