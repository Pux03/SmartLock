import { createAction, props } from "@ngrx/store";
import { Locker } from "../../core/services/locker.services";

export const loadLockers = createAction(
    '[Locker] Load Lockers',
    props<{ lockerGroupId: number }>()
);

export const loadAllLockers = createAction(
    '[Locker] Load All Lockers'
);

export const loadLockersSuccess = createAction(
    '[Locker] Load Lockers Success',
    props<{ lockers: Locker[] }>()
);

export const loadLockersFailure = createAction(
    '[Locker] Load Lockers Failure',
    props<{ error: string }>()
);

export const toggleLockerLock = createAction(
    '[Locker] Toggle Locker Lock',
    props<{ lockerId: number }>()
);

export const toggleLockerLockSuccess = createAction(
    '[Locker] Toggle Locker Lock Success',
    props<{ locker: Locker }>()
);

export const toggleLockerLockFailure = createAction(
    '[Locker] Toggle Locker Lock Failure',
    props<{ error: string }>()
);

export const assignLockerToUser = createAction(
    '[Locker] Assign Locker To User',
    props<{ userId: number, lockerId: number }>()
);

export const assignLockerToUserSuccess = createAction(
    '[Locker] Assign Locker To User Success',
    props<{ locker: Locker }>()
);

export const assignLockerToUserFailure = createAction(
    '[Locker] Assign Locker To User Failure',
    props<{ error: string }>()
);

export const updateLocker = createAction(
    '[Locker] Update Locker',
    props<{ id: number, data: Partial<Locker> }>()
);

export const updateLockerSuccess = createAction(
    '[Locker] Update Locker Success',
    props<{ locker: Locker }>()
);

export const updateLockerFailure = createAction(
    '[Locker] Update Locker Failure',
    props<{ error: string }>()
);

export const deleteLocker = createAction(
    '[Locker] Delete Locker',
    props<{ id: number }>()
);

export const deleteLockerSuccess = createAction(
    '[Locker] Delete Locker Success',
    props<{ id: number }>()
);

export const deleteLockerFailure = createAction(
    '[Locker] Delete Locker Failure',
    props<{ error: string }>()
);

export const loadLockerById = createAction(
    '[Locker] Load Locker By Id',
    props<{ lockerId: number }>()
);

export const loadLockerByIdSuccess = createAction(
    '[Locker] Load Locker By Id Success',
    props<{ locker: Locker }>()
);

export const loadLockerByIdFailure = createAction(
    '[Locker] Load Locker By Id Failure',
    props<{ error: string }>()
);
