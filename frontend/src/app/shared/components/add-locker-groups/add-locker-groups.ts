import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Locker, LockerData } from '../locker/locker';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../../core/services/company.service'
import { AuthService } from '../../../core/services/auth.services';
import { LockerGroup, LockerGroupServices } from '../../../core/services/lockerGroup.services';
import { LockerServices } from '../../../core/services/locker.services';
import * as LockerGroupActions from '../../../store/locker-group/locker-group.actions';

@Component({
    selector: 'app-add-locker-groups',
    standalone: true,
    imports: [CommonModule, FormsModule, Locker],
    templateUrl: './add-locker-groups.html',
    styleUrls: ['./add-locker-groups.css']
})
export class AddLockerGroups implements OnInit {

    showHeaders: boolean = true;
    isLoading: boolean = false;
    lockerGroupName: string = '';
    group: LockerGroup | undefined;
    companyId: number = 0;
    lockers: LockerData[] = [{
        id: Date.now(),
        serial: '',
        group: { id: 0, name: "", companyId: 0, lockers: [] },
        x: 0,
        y: 0,
        status: 'FREE'
    }];

    private store = inject(Store);

    constructor(private lockerGroupServices: LockerGroupServices, private authService: AuthService, private lockerServices: LockerServices) {

    }
    ngOnInit() {
        const id = this.authService.getCompanyId();
        if (id) {
            this.companyId = id;
        }
    }

    trackByLocker(index: number, item: LockerData) {
        return item.id;
    }

    isPositionFree = (x: number, y: number): boolean => {
        return !this.lockers.some(l => l.x === x && l.y === y);
    };

    updateLocker(updatedLocker: LockerData) {
        this.lockers = this.lockers.map(lock =>
            lock.id === updatedLocker.id ? updatedLocker : lock
        );
    }

    deleteLocker(lockerId: number | string) {
        if (this.lockers.length <= 1) {
            alert('Cannot delete last locker!');
            return;
        }
        this.lockers = this.lockers.filter(lock => lock.id !== lockerId);
    }

    addLocker(baseLocker: LockerData, direction: string) {
        let x = baseLocker.x;
        let y = baseLocker.y;

        switch (direction) {
            case 'top': y -= 1; break;
            case 'right': x += 1; break;
            case 'bottom': y += 1; break;
            case 'left': x -= 1; break;
            default: return;
        }

        if (!this.isPositionFree(x, y)) return;

        const newLocker: LockerData = {
            id: Date.now() + Math.random(),
            group: { id: 0, name: '', companyId: 0, lockers: [] },
            serial: '',
            x,
            y,
            status: 'FREE'
        };

        this.lockers = [...this.lockers, newLocker];
    }

    validateLockers(): boolean {
        for (const locker of this.lockers) {
            if (!locker.serial?.trim()) {
                alert(`There is no serial for locker: ${locker.x} ${locker.y}`);
                return false;
            }
        }
        return true;
    }

    async saveArrangement() {
        if (!this.validateLockers()) return;

        this.isLoading = true;
        try {
            const lockerData = this.lockers.map(locker => ({
                serial: locker.serial,
                status: locker.status,
                x: locker.x,
                y: locker.y,
                locked: 'UNLOCKED',
            }));

            this.store.dispatch(LockerGroupActions.createLockerGroup({
                name: this.lockerGroupName,
                companyId: this.companyId,
                lockers: lockerData
            }));

            this.lockers = [{
                id: Date.now(),
                group: { id: 0, name: "", companyId: 0, lockers: [] },
                serial: '',
                x: 0,
                y: 0,
                status: 'FREE'
            }];
            this.lockerGroupName = '';

        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            this.isLoading = false;
        }
    }

    getLockerStyle(locker: LockerData) {
        return {
            position: 'absolute',
            left: `${locker.x * 280}px`,
            top: `${locker.y * 245}px`
        };
    }
}
