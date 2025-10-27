import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
    selectUserState,
    (state: UserState) => state.users
);

export const selectUserLoading = createSelector(
    selectUserState,
    (state: UserState) => state.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (state: UserState) => state.error
);

export const selectUserById = (id: number) => createSelector(
    selectAllUsers,
    (users) => users.find(user => user.id === id)
);

export const selectUsersByRole = (role: string) => createSelector(
    selectAllUsers,
    (users) => users.filter(user => user.role === role)
);
