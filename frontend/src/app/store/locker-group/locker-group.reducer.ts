import { createReducer, on } from "@ngrx/store";
import { LockerGroup } from "../../core/services/lockerGroup.services";
import * as LockerGroupActions from './locker-group.actions';

export interface LockerGroupState {
    lockerGroups: LockerGroup[];
    currentLockerGroup: LockerGroup | null;
    loading: boolean;
    error: string | null;
}

export const initialState: LockerGroupState = {
    lockerGroups: [],
    currentLockerGroup: null,
    loading: false,
    error: null
};

export const lockerGroupReducer = createReducer(
    initialState,

    // Create LockerGroup
    on(LockerGroupActions.createLockerGroup, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LockerGroupActions.createLockerGroupSuccess, (state, { lockerGroup }) => ({
        ...state,
        loading: false,
        lockerGroups: [...state.lockerGroups, lockerGroup]
    })),
    on(LockerGroupActions.createLockerGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load LockerGroups
    on(LockerGroupActions.loadLockerGroups, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LockerGroupActions.loadLockerGroupsSuccess, (state, { lockerGroups }) => ({
        ...state,
        loading: false,
        lockerGroups
    })),
    on(LockerGroupActions.loadLockerGroupsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Get LockerGroup
    on(LockerGroupActions.getLockerGroup, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LockerGroupActions.getLockerGroupSuccess, (state, { lockerGroup }) => ({
        ...state,
        loading: false,
        currentLockerGroup: lockerGroup
    })),
    on(LockerGroupActions.getLockerGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update LockerGroup
    on(LockerGroupActions.updateLockerGroup, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LockerGroupActions.updateLockerGroupSuccess, (state, { lockerGroup }) => ({
        ...state,
        loading: false,
        lockerGroups: state.lockerGroups.map(lg =>
            lg.id === lockerGroup.id ? lockerGroup : lg
        ),
        currentLockerGroup: state.currentLockerGroup?.id === lockerGroup.id ? lockerGroup : state.currentLockerGroup
    })),
    on(LockerGroupActions.updateLockerGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete LockerGroup
    on(LockerGroupActions.deleteLockerGroup, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LockerGroupActions.deleteLockerGroupSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        lockerGroups: state.lockerGroups.filter(lg => lg.id !== id),
        currentLockerGroup: state.currentLockerGroup?.id === id ? null : state.currentLockerGroup
    })),
    on(LockerGroupActions.deleteLockerGroupFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
