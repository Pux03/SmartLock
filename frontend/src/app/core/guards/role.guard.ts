import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectUser } from '../../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private store: Store,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.store.select(selectUser).pipe(
            take(1),
            map(user => {
                console.log('User role:', user?.role);

                // Handle case where user might be null
                if (!user) {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        user = JSON.parse(storedUser);
                    } else {
                        this.router.navigate(['/login']);
                        return false;
                    }
                }

                const requiredRole = route.data['role'];
                console.log('Required role:', requiredRole);
                console.log('Role match:', requiredRole === user.role);

                if (!requiredRole) {
                    return true;
                }

                if (user.role === requiredRole) {
                    return true;
                } else {
                    this.router.navigate(['/unauthorized']);
                    return false;
                }
            })
        );
    }
}
