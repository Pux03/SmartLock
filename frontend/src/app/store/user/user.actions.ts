import { createAction, props } from "@ngrx/store";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone?: string;
    locker?: {
        lockerGroup?: string;
        serial?: string;
    };
}

export const loadCompanyUsers = createAction(
    '[User] Load Company Users',
    props<{ companyId: number }>()
);

export const loadCompanyUsersSuccess = createAction(
    '[User] Load Company Users Success',
    props<{ users: User[] }>()
);

export const loadCompanyUsersFailure = createAction(
    '[User] Load Company Users Failure',
    props<{ error: string }>()
);

export const createUser = createAction(
    '[User] Create User',
    props<{ userData: any }>()
);

export const createUserSuccess = createAction(
    '[User] Create User Success',
    props<{ user: User }>()
);

export const createUserFailure = createAction(
    '[User] Create User Failure',
    props<{ error: string }>()
);

export const updateUser = createAction(
    '[User] Update User',
    props<{ id: number, data: Partial<User> }>()
);

export const updateUserSuccess = createAction(
    '[User] Update User Success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[User] Update User Failure',
    props<{ error: string }>()
);

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ id: number }>()
);

export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: string }>()
);
