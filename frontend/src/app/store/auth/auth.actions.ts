import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any; accessToken: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{ firstName: string; lastName: string; email: string; password: string; role: string; companyId?: number; lockerId?: number }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: any }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const verify = createAction('[Auth] Verify');

export const verifySuccess = createAction(
    '[Auth] Verify Success',
    props<{ user: any }>()
);

export const verifyFailure = createAction(
    '[Auth] Verify Failure',
    props<{ error: any }>()
);

export const updateUserLocker = createAction(
    '[Auth] Update User Locker',
    props<{ locker: any }>()
);
