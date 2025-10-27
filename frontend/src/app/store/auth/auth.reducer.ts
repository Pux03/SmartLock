import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user: any | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('token'),
    loading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { user, accessToken }) => ({
        ...state,
        user,
        accessToken,
        loading: false,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),
    on(AuthActions.register, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.registerSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),
    on(AuthActions.logout, () => initialState)
);
