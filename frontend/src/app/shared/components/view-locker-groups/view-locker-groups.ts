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

        this.store.select(LockerGroupSelectors.selectLockerGroupLoading).subscribe(loading => {
            this.isLoading = loading;
        });
    }

    fetchLockerGroups() {
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


    getLockerStyle(locker: LockerData) {
        return {
            position: 'absolute',
            left: `${locker.x * 280}px`,
            top: `${locker.y * 320}px`
        };
    }

    getUserFullName(userId: number | null): string {
        if (!userId) return 'Select user';
        const user = this.usersWithoutLockers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Select user';
    }

    deleteLockerGroup() {
        if (!this.selectedGroup) {
            alert('Please select a locker group to delete.');
            return;
        }

        const groupName = this.selectedGroup.name;
        const confirmation = confirm(`Are you sure you want to delete the locker group "${groupName}"? This action cannot be undone.`);

        if (confirmation) {
            const deletedGroupId = this.selectedGroup.id;
            this.store.dispatch(LockerGroupActions.deleteLockerGroup({ id: deletedGroupId }));

            this.selectedGroup = null;
            this.lockers = [];
        }
    }
}
