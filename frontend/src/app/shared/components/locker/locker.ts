import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LockerGroup } from '../../../core/services/lockerGroup.services';

export type LockerStatus = 'FREE';

export interface LockerData {
    id: number | string;
    serial: string;
    group: LockerGroup;
    x: number;
    y: number;
    status: LockerStatus;
}

@Component({
    selector: 'app-locker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './locker.html',
    styleUrls: ['./locker.css']
})
export class Locker {

    @Input() locker!: LockerData;
    @Input() viewMode: boolean = false;
    @Input() editMode: boolean = false;
    @Input() isPositionFree!: (x: number, y: number) => boolean;

    @Output() onAdd = new EventEmitter<string>();
    @Output() onUpdate = new EventEmitter<LockerData>();
    @Output() onDelete = new EventEmitter<number | string>();
    @Output() onSave = new EventEmitter<LockerData>();

    isHovered: boolean = false;
    isEditing: boolean = false;
    isSaving: boolean = false;
    localLocker!: LockerData;

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
            case 'UNLOCKED': return 'green';
            case 'LOCKED': return 'red';
            case 'UNOCCUPIED': return 'gray';
            default: return 'YELLOW';
        }
    }
}
