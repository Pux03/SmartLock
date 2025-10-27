import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CompanyService } from "../../core/services/company.service";
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private companyService = inject(CompanyService);

    loadCompanyUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadCompanyUsers),
            mergeMap(({ companyId }) =>
                this.companyService.getCompanyUsers(companyId).pipe(
                    map((users: any[]) => {
                        console.log('Users from API:', users);
                        return UserActions.loadCompanyUsersSuccess({ users });
                    }),
                    catchError(error => of(UserActions.loadCompanyUsersFailure({ error: error.message })))
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            mergeMap(({ userData }) =>
                this.companyService.createUser(userData).pipe(
                    map((user: any) => UserActions.createUserSuccess({ user })),
                    catchError(error => of(UserActions.createUserFailure({ error: error.message })))
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap(({ id, data }) =>
                this.companyService.updateUser(id, data).pipe(
                    map((user: any) => UserActions.updateUserSuccess({ user })),
                    catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(({ id }) =>
                this.companyService.deleteUser(id).pipe(
                    map(() => UserActions.deleteUserSuccess({ id })),
                    catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
                )
            )
        )
    );
}
