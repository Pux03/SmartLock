import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { environment } from "../../environments/environment";

const api = environment.apiUrl;

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) =>
                this.http.post<any>(`${api}/auth/login`, { email, password })
                    .pipe(
                        map((response) => {
                            localStorage.setItem('token', response.access_token);

                            const tokenPayload = this.decodeJwtToken(response.access_token);
                            const user = tokenPayload ? {
                                id: tokenPayload.sub,
                                email: tokenPayload.email,
                                firstName: tokenPayload.firstName,
                                lastName: tokenPayload.lastName,
                                role: tokenPayload.role,
                                companyId: tokenPayload.companyId,
                                lockerId: tokenPayload.locker.id // Only store locker ID, not the locker object
                            } : null;

                            if (user) {
                                localStorage.setItem('user', JSON.stringify(user));
                            }
                            return AuthActions.loginSuccess({
                                user: user,
                                accessToken: response.access_token,
                            });
                        }),
                        catchError((error) =>
                            of(AuthActions.loginFailure({ error: error.message }))
                        )
                    )
            )
        )
    );

    redirectAfterLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap((action) => {

                const redirectUrl =
                    action.user.role === 'SUPER_ADMIN' ? '/super-admin'
                        : action.user.role === 'ADMIN' ? `/company`
                            : action.user.role === 'USER' ? '/user' : '/';
                this.router.navigate([redirectUrl]);
            })
        ), { dispatch: false }
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

    verify$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.verify),
            mergeMap(() =>
                this.http.get<any>(`${api}/auth/verify`, { withCredentials: true }).pipe(
                    map((user) => AuthActions.verifySuccess({ user })),
                    catchError((error) => of(AuthActions.verifyFailure({ error: error.message })))
                )
            )
        )
    );

    private decodeJwtToken(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    }
}
