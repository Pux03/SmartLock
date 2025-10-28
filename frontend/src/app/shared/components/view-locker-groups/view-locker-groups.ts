import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Locker, LockerData } from '../locker/locker';
import { AuthService } from '../../../core/services/auth.services';
import { LockerGroupServices } from '../../../core/services/lockerGroup.services';
import { LockerServices } from '../../../core/services/locker.services';
import { CompanyService } from '../../../core/services/company.service';
import * as LockerGroupActions from '../../../store/locker-group/locker-group.actions';
import * as LockerGroupSelectors from '../../../store/locker-group/locker-group.selectors';

interface LockerGroup {
    id: number;
    name: string;
    lockers: LockerData[];
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

@Component({
    selector: 'app-view-locker-groups',
    standalone: true,
    imports: [CommonModule, FormsModule, Locker],
    templateUrl: './view-locker-groups.html',
    styleUrls: ['./view-locker-groups.css']
})
export class ViewLockerGroups implements OnInit {
    isLoading: boolean = false;
    lockerGroups: LockerGroup[] = [];
    selectedGroup: LockerGroup | null = null;
    companyId: number = 0;
    lockers: LockerData[] = [];
    usersWithoutLockers: User[] = [];
    selectedUserForAssignment: { [lockerId: string]: number | null } = {};

    private store = inject(Store);

    constructor(
        private authService: AuthService,
        private lockerGroupServices: LockerGroupServices,
        private lockerServices: LockerServices,
        private companyServices: CompanyService
    ) { }

    ngOnInit() {
        const id = this.authService.getCompanyId();
        if (id) {
            this.companyId = id;
            this.fetchLockerGroups();
            this.loadUsersWithoutLockers();
        }

        // Subscribe to locker groups from store
        this.store.select(LockerGroupSelectors.selectAllLockerGroups).subscribe(lockerGroups => {
            this.lockerGroups = lockerGroups.map(group => ({
                id: group.id,
                name: group.name,
                lockers: group.lockers || []
            }));

            if (this.lockerGroups.length > 0 && !this.selectedGroup) {
                this.selectedGroup = this.lockerGroups[0];
                this.lockers = this.selectedGroup.lockers;
                this.initializeUserSelections();
            }
        });

        // Subscribe to loading state
        this.store.select(LockerGroupSelectors.selectLockerGroupLoading).subscribe(loading => {
            this.isLoading = loading;
        });
    }

    fetchLockerGroups() {
        // Use the store to load locker groups
        this.store.dispatch(LockerGroupActions.loadLockerGroups({ companyId: this.companyId }));
    }

    loadUsersWithoutLockers() {
        this.companyServices.getUsersWithoutLockers(this.companyId).subscribe({
            next: (users) => {
                this.usersWithoutLockers = users;
            },
            error: (err) => {
                console.error('Failed to load users without lockers:', err);
            }
        });
    }

    initializeUserSelections() {
        this.selectedUserForAssignment = {};
        if (this.selectedGroup) {
            this.selectedGroup.lockers.forEach(locker => {
                this.selectedUserForAssignment[locker.id] = null;
            });
        }
    }

    selectGroup(group: LockerGroup | null) {
        if (!group) return;
        this.selectedGroup = group;
        this.lockers = group.lockers;
        this.initializeUserSelections();
    }

    trackByLocker(index: number, item: LockerData) {
        return item.id;
    }

    isPositionFree = (x: number, y: number): boolean => {
        return !this.lockers.some(l => l.x === x && l.y === y);
    };

    deleteLocker(lockerId: number | string) {
        // if (!this.selectedGroup) return;

        // this.lockerServices.deleteLocker(lockerId).subscribe({
        //   next: () => {
        //     this.selectedGroup!.lockers = this.selectedGroup!.lockers.filter(l => l.id !== lockerId);
        //     this.lockers = this.selectedGroup!.lockers;
        //   },
        //   error: (err) => {
        //     console.error('Failed to delete locker:', err);
        //   }
        // });
    }

    updateLocker(updatedLocker: LockerData) {
        // this.lockerServices.updateLocker(updatedLocker.id, updatedLocker).subscribe({
        //   next: (data) => {
        //     this.lockers = this.lockers.map(lock =>
        //       lock.id === updatedLocker.id ? data : lock
        //     );
        //     if (this.selectedGroup) {
        //       this.selectedGroup.lockers = this.lockers;
        //     }
        //   },
        //   error: (err) => {
        //     console.error('Failed to update locker:', err);
        //   }
        // });
    }

    assignUserToLocker(lockerId: number | string) {
        // This method is no longer needed as assignment is handled in the locker component
    }

    getLockerStyle(locker: LockerData) {
        return {
            position: 'absolute',
            left: `${locker.x * 280}px`,
            top: `${locker.y * 240}px`
        };
    }

    getUserFullName(userId: number | null): string {
        if (!userId) return 'Select user';
        const user = this.usersWithoutLockers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Select user';
    }
}
