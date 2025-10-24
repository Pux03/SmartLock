import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { environment } from "../../environments/environment";

const api = environment.apiUrl;
@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ email, password }) =>
                this.http
                    .post<any>(`${api}/auth/login`, { email, password })
                    .pipe(
                        map((response) =>
                            AuthActions.loginSuccess({
                                user: response.user,
                                accessToken: response.access_token,
                            })
                        ),
                        catchError((error) =>
                            of(AuthActions.loginFailure({ error: error.message }))
                        )
                    )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap(
                ({
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    companyId,
                    lockerId,
                }) =>
                    this.http
                        .post<any>(`${api}/auth/register`, {
                            firstName,
                            lastName,
                            email,
                            password,
                            role,
                            companyId,
                            lockerId,
                        })
                        .pipe(
                            map((user) => AuthActions.registerSuccess({ user })),
                            catchError((error) =>
                                of(AuthActions.registerFailure({ error: error.message }))
                            )
                        )
            )
        )
    );
}