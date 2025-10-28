import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.services';
import { CompanyService } from '../../../core/services/company.service';
import * as UserActions from '../../../store/user/user.actions';
import * as UserSelectors from '../../../store/user/user.selectors';

@Component({
    selector: 'app-view-users',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-users.html',
    styleUrl: './view-users.css'
})
export class ViewUsers implements OnInit {
    companyId: number | null = null;
    users: any[] = [];
    loading: boolean = false;

    private store = inject(Store);
    private authService = inject(AuthService);
    private companyService = inject(CompanyService);

    ngOnInit() {
        this.companyId = this.authService.getCompanyId();
        if (this.companyId) {
            this.loadUsers();
        }

        this.store.select(UserSelectors.selectAllUsers).subscribe(users => {
            this.users = users;
        });

        this.store.select(UserSelectors.selectUserLoading).subscribe(loading => {
            this.loading = loading;
        });

    }

    loadUsers() {
        if (this.companyId) {
            this.store.dispatch(UserActions.loadCompanyUsers({ companyId: this.companyId }));
        }
    }


}