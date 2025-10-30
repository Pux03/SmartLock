import { createReducer, on } from '@ngrx/store';
import { Locker } from '../../core/services/locker.services';
import * as LockerActions from './locker.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface LockerState extends EntityState<Locker> {
    loading: boolean;
    error: string | null;
    currentLockerGroupId: number | null;
}

export const lockerAdapter: EntityAdapter<Locker> = createEntityAdapter<Locker>({
    selectId: (locker) => locker.id,
    sortComparer: false,
});

export const initialState: LockerState = lockerAdapter.getInitialState({
    loading: false,
    error: null,
    currentLockerGroupId: null
});

export const lockerReducer = createReducer(
    initialState,

    on(LockerActions.loadLockers, (state, { lockerGroupId }) => ({
        ...state,
        loading: true,
        error: null,
        currentLockerGroupId: lockerGroupId
    })),

    on(LockerActions.loadLockersSuccess, (state, { lockers }) =>
        lockerAdapter.setAll(lockers, {
            ...state,
            loading: false,
            error: null
        })
    ),

    on(LockerActions.loadLockerById, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LockerActions.loadLockerByIdSuccess, (state, { locker }) =>
        lockerAdapter.upsertOne(locker, {
            ...state,
            loading: false,
            error: null
        })
    ),

    on(LockerActions.loadLockerByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),


    on(LockerActions.loadLockersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(LockerActions.toggleLockerLock, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LockerActions.toggleLockerLockSuccess, (state, { locker }) =>
        lockerAdapter.updateOne(
            { id: locker.id, changes: locker },
            { ...state, loading: false }
        )
    ),

    on(LockerActions.toggleLockerLockFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(LockerActions.assignLockerToUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LockerActions.assignLockerToUserSuccess, (state, { locker }) =>
        lockerAdapter.updateOne(
            { id: locker.id, changes: locker },
            { ...state, loading: false, error: null }
        )
    ),

    on(LockerActions.assignLockerToUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(LockerActions.updateLocker, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LockerActions.updateLockerSuccess, (state, { locker }) =>
        lockerAdapter.updateOne(
            { id: locker.id, changes: locker },
            { ...state, loading: false, error: null }
        )
    ),

    on(LockerActions.updateLockerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(LockerActions.deleteLocker, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LockerActions.deleteLockerSuccess, (state, { id }) =>
        lockerAdapter.removeOne(id, {
            ...state,
            loading: false,
            error: null
        })
    ),

    on(LockerActions.deleteLockerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
