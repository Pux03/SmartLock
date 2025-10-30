import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LockerGroup } from '../../../core/services/lockerGroup.services';
import { AuthService } from '../../../core/services/auth.services';
import * as UserActions from '../../../store/user/user.actions';
import * as UserSelectors from '../../../store/user/user.selectors';

export type LockerStatus = 'FREE';

export interface LockerData {
    id: number | string;
    serial: string;
    group?: LockerGroup;
    x: number;
    y: number;
    status: string;
}

@Component({
    selector: 'app-locker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './locker.html',
    styleUrls: ['./locker.css']
})
export class Locker implements OnInit {

    @Input() locker!: LockerData;
    @Input() viewMode: boolean = false;
    @Input() editMode: boolean = false;
    @Input() isPositionFree!: (x: number, y: number) => boolean;
    @Input() companyId: number = 0;

    @Output() onAdd = new EventEmitter<string>();
    @Output() onUpdate = new EventEmitter<LockerData>();
    @Output() onDelete = new EventEmitter<number | string>();
    @Output() onSave = new EventEmitter<LockerData>();

    isHovered: boolean = false;
    isEditing: boolean = false;
    isSaving: boolean = false;
    localLocker!: LockerData;
    selectedUserId: number | null = null;
    usersWithoutLockers: any[] = [];
    loading: boolean = false;

    private store = inject(Store);
    private authService = inject(AuthService);

    ngOnInit() {
        if (this.companyId) {
            this.loadUsersWithoutLockers();
        }

        this.store.select(UserSelectors.selectUsersWithoutLockers).subscribe(users => {
            this.usersWithoutLockers = users;
        });

        this.store.select(UserSelectors.selectUserLoading).subscribe(loading => {
            this.loading = loading;
        });
    }

    loadUsersWithoutLockers() {
        if (this.companyId) {
            this.store.dispatch(UserActions.loadUsersWithoutLockers({ companyId: this.companyId }));
        }
    }

    assignUserToLocker() {
        if (!this.selectedUserId) {
            alert('Please select a user to assign');
            return;
        }

        if (typeof this.locker.id === 'string') {
            alert('Cannot assign user to temporary locker');
            return;
        }

        this.store.dispatch(UserActions.assignLockerToUser({
            userId: this.selectedUserId,
            lockerId: this.locker.id as number,
            companyId: this.companyId
        }));

        this.selectedUserId = null;
    }

    get isInEditMode(): boolean {
        return this.editMode && this.isEditing;
    }

    get isReadOnly(): boolean {
        return this.viewMode || (this.editMode && !this.isEditing);
    }

    async handleSave() {
        if (!this.localLocker.serial?.trim()) {
            alert('Serial number is required');
            return;
        }

        this.isSaving = true;
        try {
            this.onSave.emit(this.localLocker);
            this.isEditing = false;
            this.onUpdate.emit(this.localLocker);
        } catch (error) {
            console.error('Failed to save locker:', error);
            alert('Failed to save locker');
        } finally {
            this.isSaving = false;
        }
    }

    handleCancel() {
        this.localLocker = { ...this.locker };
        this.isEditing = false;
    }

    startEditing() {
        this.isEditing = true;
    }

    deleteLocker() {
        this.onDelete.emit(this.locker.id);
    }

    addLockerDirection(direction: string) {
        this.onAdd.emit(direction);
    }

    updateLocalSerial(value: string) {
        if (this.isInEditMode) {
            this.localLocker.serial = value;
        } else if (!this.isReadOnly) {
            this.onUpdate.emit({ ...this.locker, serial: value });
        }
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'OCCUPIED': return 'red';
            case 'FREE': return 'GREEN';
            default: return 'YELLOW';
        }
    }

    getUserFullName(userId: number | null): string {
        if (!userId) return 'Assign user';
        const user = this.usersWithoutLockers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Assign user';
    }
}
