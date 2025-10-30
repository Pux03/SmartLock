import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { LockerGroupServices } from "../../core/services/lockerGroup.services";
import { LockerServices } from "../../core/services/locker.services";
import * as LockerGroupActions from './locker-group.actions';
import { AuthService } from "../../core/services/auth.services";

@Injectable()
export class LockerGroupEffects {
    private actions$ = inject(Actions);
    private lockerGroupServices = inject(LockerGroupServices);
    private lockerServices = inject(LockerServices);
    private authServices = inject(AuthService);

    createLockerGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.createLockerGroup),
            mergeMap(({ name, companyId, lockers }) =>
                this.lockerGroupServices.createLockerGroup(name, companyId).pipe(
                    mergeMap(lockerGroup => {
                        const lockerData = lockers.map(locker => ({
                            ...locker,
                            group: { id: lockerGroup.id }
                        }));

                        return this.lockerServices.addLockers(lockerData).pipe(
                            map(() => LockerGroupActions.createLockerGroupSuccess({ lockerGroup })),
                            catchError(error => of(LockerGroupActions.createLockerGroupFailure({ error: error.message })))
                        );
                    }),
                    catchError(error => of(LockerGroupActions.createLockerGroupFailure({ error: error.message })))
                )
            )
        )
    );

    loadLockerGroups$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.loadLockerGroups),
            mergeMap(({ companyId }) =>
                this.lockerGroupServices.getLockerGroups(companyId).pipe(
                    map(lockerGroups => LockerGroupActions.loadLockerGroupsSuccess({ lockerGroups })),
                    catchError(error => of(LockerGroupActions.loadLockerGroupsFailure({ error: error.message })))
                )
            )
        )
    );

    getLockerGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.getLockerGroup),
            mergeMap(({ id }) =>
                this.lockerGroupServices.getLockerGroup(id).pipe(
                    map(lockerGroup => LockerGroupActions.getLockerGroupSuccess({ lockerGroup })),
                    catchError(error => of(LockerGroupActions.getLockerGroupFailure({ error: error.message })))
                )
            )
        )
    );

    updateLockerGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.updateLockerGroup),
            mergeMap(({ id, data }) =>
                this.lockerGroupServices.updateLockerGroup(id, data).pipe(
                    map(lockerGroup => LockerGroupActions.updateLockerGroupSuccess({ lockerGroup })),
                    catchError(error => of(LockerGroupActions.updateLockerGroupFailure({ error: error.message })))
                )
            )
        )
    );

    deleteLockerGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.deleteLockerGroup),
            mergeMap(({ id }) =>
                this.lockerGroupServices.deleteLockerGroup(id).pipe(
                    map(() => LockerGroupActions.deleteLockerGroupSuccess({ id })),
                    catchError(error => of(LockerGroupActions.deleteLockerGroupFailure({ error: error.message })))
                )
            )
        )
    );

    refreshGroupsAfterDelete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LockerGroupActions.deleteLockerGroupSuccess),
            map(() => this.authServices.getCompanyId()),
            filter((id): id is number => id !== null),
            map((id) => LockerGroupActions.loadLockerGroups({ companyId: id }))
        )
    );

}
