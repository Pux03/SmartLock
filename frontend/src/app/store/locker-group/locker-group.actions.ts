import { createAction, props } from "@ngrx/store";
import { LockerGroup } from "../../core/services/lockerGroup.services";

export const createLockerGroup = createAction(
    '[LockerGroup] Create LockerGroup',
    props<{ name: string, companyId: number, lockers: any[] }>()
);

export const createLockerGroupSuccess = createAction(
    '[LockerGroup] Create LockerGroup Success',
    props<{ lockerGroup: LockerGroup }>()
);

export const createLockerGroupFailure = createAction(
    '[LockerGroup] Create LockerGroup Failure',
    props<{ error: string }>()
);

export const loadLockerGroups = createAction(
    '[LockerGroup] Load LockerGroups',
    props<{ companyId: number }>()
);

export const loadLockerGroupsSuccess = createAction(
    '[LockerGroup] Load LockerGroups Success',
    props<{ lockerGroups: LockerGroup[] }>()
);

export const loadLockerGroupsFailure = createAction(
    '[LockerGroup] Load LockerGroups Failure',
    props<{ error: string }>()
);

export const getLockerGroup = createAction(
    '[LockerGroup] Get LockerGroup',
    props<{ id: number }>()
);

export const getLockerGroupSuccess = createAction(
    '[LockerGroup] Get LockerGroup Success',
    props<{ lockerGroup: LockerGroup }>()
);

export const getLockerGroupFailure = createAction(
    '[LockerGroup] Get LockerGroup Failure',
    props<{ error: string }>()
);

export const updateLockerGroup = createAction(
    '[LockerGroup] Update LockerGroup',
    props<{ id: number, data: Partial<LockerGroup> }>()
);

export const updateLockerGroupSuccess = createAction(
    '[LockerGroup] Update LockerGroup Success',
    props<{ lockerGroup: LockerGroup }>()
);

export const updateLockerGroupFailure = createAction(
    '[LockerGroup] Update LockerGroup Failure',
    props<{ error: string }>()
);

export const deleteLockerGroup = createAction(
    '[LockerGroup] Delete LockerGroup',
    props<{ id: number }>()
);

export const deleteLockerGroupSuccess = createAction(
    '[LockerGroup] Delete LockerGroup Success',
    props<{ id: number }>()
);

export const deleteLockerGroupFailure = createAction(
    '[LockerGroup] Delete LockerGroup Failure',
    props<{ error: string }>()
);
