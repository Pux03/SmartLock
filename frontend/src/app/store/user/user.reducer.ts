import { createReducer, on } from "@ngrx/store";
import { User } from "./user.actions";
import * as UserActions from './user.actions';

export interface UserState {
    users: User[];
    usersWithoutLockers: any[];
    loading: boolean;
    error: string | null;
}

export const initialState: UserState = {
    users: [],
    usersWithoutLockers: [],
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,

    // Load Company Users
    on(UserActions.loadCompanyUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadCompanyUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        users
    })),
    on(UserActions.loadCompanyUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load Users Without Lockers
    on(UserActions.loadUsersWithoutLockers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUsersWithoutLockersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        usersWithoutLockers: users
    })),
    on(UserActions.loadUsersWithoutLockersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Assign Locker To User
    on(UserActions.assignLockerToUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.assignLockerToUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        usersWithoutLockers: state.usersWithoutLockers.filter(u => u.id !== user.id)
    })),
    on(UserActions.assignLockerToUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create User
    on(UserActions.createUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.createUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        users: [...state.users, user]
    })),
    on(UserActions.createUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update User
    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        users: state.users.map(u => u.id === user.id ? user : u)
    })),
    on(UserActions.updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete User
    on(UserActions.deleteUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.deleteUserSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        users: state.users.filter(u => u.id !== id)
    })),
    on(UserActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
