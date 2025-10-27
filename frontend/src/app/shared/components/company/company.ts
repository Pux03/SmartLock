import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CompanyActions from '../../../store/company/company.actions';
import { selectCompanies, selectCompanyById, selectCompanyLoading } from '../../../store/company/company.selectors';
import { selectUser } from '../../../store/auth/auth.selectors';
import { Avatar } from '../avatar/avatar';
import { ViewLockerGroups } from '../view-locker-groups/view-locker-groups';
import { AddLockerGroups } from '../add-locker-groups/add-locker-groups';
import { ViewUsers } from '../view-users/view-users';
import { AddUsers } from '../add-users/add-users';

@Component({
    selector: 'app-company',
    standalone: true,
    imports: [CommonModule, Avatar, ViewLockerGroups, AddLockerGroups, ViewUsers, AddUsers],
    templateUrl: './company.html',
    styleUrls: ['./company.css'],
})
export class Company {
    selected: string = "view-users";
    companyName: string = '';
    companyUser: string = '';
    private store = inject(Store);

    ngOnInit() {
        this.selected = 'view-users';
        this.getCompany();
        this.getCompanyUser();
    }

    getCompanyUser() {
        this.store.select(selectUser).subscribe(user => {
            if (user) {
                this.companyUser = `${user.firstName} ${user.lastName}`;
            }
        });
    }

    getCompany() {
        this.store.select(selectUser).subscribe(user => {
            if (user && user.companyId) {
                // Check if company is already in store
                this.store.select(selectCompanyById(user.companyId)).subscribe(company => {
                    if (company) {
                        this.companyName = company.name;
                    } else {
                        // If company not in store, fetch it
                        this.store.dispatch(CompanyActions.getCompany({ id: user.companyId }));
                    }
                });

                // Listen for company updates
                this.store.select(selectCompanies).subscribe(companies => {
                    const company = companies.find(c => c.id === user.companyId);
                    if (company) {
                        this.companyName = company.name;
                    }
                });
            }
        });
    }

    selectView(view: string) {
        this.selected = view;
    }
}
