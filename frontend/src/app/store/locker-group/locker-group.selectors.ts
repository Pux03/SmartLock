import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LockerGroupState } from "./locker-group.reducer";

export const selectLockerGroupState = createFeatureSelector<LockerGroupState>('lockerGroup');

export const selectAllLockerGroups = createSelector(
    selectLockerGroupState,
    (state: LockerGroupState) => state.lockerGroups
);

export const selectCurrentLockerGroup = createSelector(
    selectLockerGroupState,
    (state: LockerGroupState) => state.currentLockerGroup
);

export const selectLockerGroupLoading = createSelector(
    selectLockerGroupState,
    (state: LockerGroupState) => state.loading
);

export const selectLockerGroupError = createSelector(
    selectLockerGroupState,
    (state: LockerGroupState) => state.error
);

export const selectLockerGroupsByCompany = (companyId: number) => createSelector(
    selectAllLockerGroups,
    (lockerGroups) => lockerGroups.filter(lg => lg.companyId === companyId)
);

export const selectLockerGroupById = (id: number) => createSelector(
    selectAllLockerGroups,
    (lockerGroups) => lockerGroups.find(lg => lg.id === id)
);
