import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lockerAdapter, LockerState } from './locker.reducer';

export const selectLockerState = createFeatureSelector<LockerState>('locker');

const { selectEntities } = lockerAdapter.getSelectors(selectLockerState);
export const selectLockerById = (id: number) => createSelector(selectEntities, entities => entities[id]);

export const {
    selectAll: selectAllLockers,
    selectEntities: selectLockerEntities,
    selectIds: selectLockerIds,
    selectTotal: selectLockerTotal,
} = lockerAdapter.getSelectors(selectLockerState);

export const selectLockersLoading = createSelector(
    selectLockerState,
    (state: LockerState) => state.loading
);

export const selectLockersError = createSelector(
    selectLockerState,
    (state: LockerState) => state.error
);

export const selectCurrentLockerGroupId = createSelector(
    selectLockerState,
    (state: LockerState) => state.currentLockerGroupId
);


export const selectLockersByGroupId = (lockerGroupId: number) => createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.lockerGroupId === lockerGroupId)
);

export const selectLockersByStatus = (status: string) => createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === status)
);

export const selectLockedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.locked === 'LOCKED')
);

export const selectUnlockedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.locked === 'UNLOCKED')
);

export const selectFreeLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === 'FREE')
);

export const selectOccupiedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === 'OCCUPIED')
);
