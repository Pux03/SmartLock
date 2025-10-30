import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap } from 'rxjs';
import { selectUser } from '../../../store/auth/auth.selectors';
import { toggleLockerLock } from '../../../store/locker/locker.actions';
import { selectLockersLoading, selectLockerById, selectLockerState } from '../../../store/locker/locker.selectors';
import { loadLockerById } from '../../../store/locker/locker.actions';
import { logout } from '../../../store/auth/auth.actions';
import { Locker } from '../locker/locker';

@Component({
    selector: 'app-user',
    imports: [CommonModule, Locker],
    templateUrl: './user.html',
    styleUrl: './user.css'
})
export class User implements OnInit {
    private store = inject(Store);

    user$ = this.store.select(selectUser);
    loading$ = this.store.select(selectLockersLoading);

    locker$ = this.user$.pipe(
        switchMap(user => {
            if (!user?.lockerId) return of(null);

            this.store.dispatch(loadLockerById({ lockerId: user.lockerId }));
            return this.store.select(selectLockerById(user.lockerId));
        })
    );

    ngOnInit() {

        this.user$.subscribe(user => {
            console.log('[User Component] user$', user);
        });

        this.store.select(selectLockerState).subscribe(state => {
            console.log('[Locker State]', state);
            console.log('[Entities]', state.entities);
        });
    }

    toggleLockerLock(lockerId: number) {
        this.store.dispatch(toggleLockerLock({ lockerId }));
    }

    getLockerStatus(locker: any): string {
        return locker?.locked === 'LOCKED' ? 'Locked' : 'Unlocked';
    }

    getLockerStatusClass(locker: any): string {
        return locker?.locked === 'LOCKED' ? 'status-locked' : 'status-unlocked';
    }
    getCurrentLocker(user: any): Observable<any> {
        if (!user || !user.lockerId) return new Observable();
        return this.store.select(selectLockerById(user.lockerId));
    }

    logout() {
        this.store.dispatch(logout());
    }
}
