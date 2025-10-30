import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LockerServices } from '../../core/services/locker.services';
import * as LockerActions from './locker.actions';
import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class LockerEffects {
    private actions$ = inject(Actions);
    private lockerService = inject(LockerServices);
    private store = inject(Store);

    loadLockers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.loadLockers),
            mergeMap(({ lockerGroupId }) =>
                this.lockerService.getLockers(lockerGroupId).pipe(
                    map(lockers => LockerActions.loadLockersSuccess({ lockers })),
                    catchError(error => of(LockerActions.loadLockersFailure({ error: error.message })))
                )
            )
        )
    );

    toggleLockerLock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.toggleLockerLock),
            mergeMap(({ lockerId }) =>
                this.lockerService.toggleLockerLock(lockerId).pipe(
                    map((locker) => LockerActions.toggleLockerLockSuccess({ locker })),
                    catchError(() => of({ type: '[Locker] Toggle Locker Lock Failure' }))
                )
            )
        )
    );

    assignLockerToUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.assignLockerToUser),
            mergeMap(({ userId, lockerId }) =>
                this.lockerService.assignLockerToUser(userId, lockerId).pipe(
                    map(() => {
                        return LockerActions.loadLockers({ lockerGroupId: 0 });
                    }),
                    catchError(error => of(LockerActions.assignLockerToUserFailure({ error: error.message })))
                )
            )
        )
    );

    updateLocker$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.updateLocker),
            mergeMap(({ id, data }) =>
                this.lockerService.updateLocker(id, data).pipe(
                    map(locker => LockerActions.updateLockerSuccess({ locker })),
                    catchError(error => of(LockerActions.updateLockerFailure({ error: error.message })))
                )
            )
        )
    );

    deleteLocker$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.deleteLocker),
            mergeMap(({ id }) =>
                this.lockerService.deleteLocker(id).pipe(
                    map(() => LockerActions.deleteLockerSuccess({ id })),
                    catchError(error => of(LockerActions.deleteLockerFailure({ error: error.message })))
                )
            )
        )
    );

    loadLockerById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerActions.loadLockerById),
            mergeMap(({ lockerId }) =>
                this.lockerService.getLocker(lockerId).pipe(
                    map((locker) => LockerActions.loadLockerByIdSuccess({ locker })),
                    catchError((error) =>
                        of(LockerActions.loadLockerByIdFailure({ error: error.message }))
                    )
                )
            )
        )
    );

}
