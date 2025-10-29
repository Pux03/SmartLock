import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lockerAdapter, LockerState } from './locker.reducer';

export const selectLockerState = createFeatureSelector<LockerState>('locker');

const { selectEntities } = lockerAdapter.getSelectors(selectLockerState);
export const selectLockerById = (id: number) => createSelector(selectEntities, entities => entities[id]);

// Entity selectors
export const {
    selectAll: selectAllLockers,
    selectEntities: selectLockerEntities,
    selectIds: selectLockerIds,
    selectTotal: selectLockerTotal,
} = lockerAdapter.getSelectors(selectLockerState);

// Loading state
export const selectLockersLoading = createSelector(
    selectLockerState,
    (state: LockerState) => state.loading
);

// Error state
export const selectLockersError = createSelector(
    selectLockerState,
    (state: LockerState) => state.error
);

// Current locker group ID
export const selectCurrentLockerGroupId = createSelector(
    selectLockerState,
    (state: LockerState) => state.currentLockerGroupId
);


// Select lockers by group ID
export const selectLockersByGroupId = (lockerGroupId: number) => createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.lockerGroupId === lockerGroupId)
);

// Select lockers by status
export const selectLockersByStatus = (status: string) => createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === status)
);

// Select locked lockers
export const selectLockedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.locked === 'LOCKED')
);

// Select unlocked lockers
export const selectUnlockedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.locked === 'UNLOCKED')
);

// Select free lockers (not assigned to any user)
export const selectFreeLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === 'FREE')
);

// Select occupied lockers
export const selectOccupiedLockers = createSelector(
    selectAllLockers,
    (lockers) => lockers.filter(locker => locker.status === 'OCCUPIED')
);
