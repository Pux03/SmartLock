import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';
import * as UserActions from '../../../store/user/user.actions';

@Component({
    selector: 'app-add-users',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-users.html',
    styleUrls: ['./add-users.css']
})
export class AddUsers {
    private store = inject(Store);
    companyId: number | null = null;
    isLoading = false;

    firstName = '';
    lastName = '';
    email = '';
    password = '';
    role = 'USER';

    ngOnInit() {
        this.store.select(selectUser).subscribe(user => {
            if (user && user.companyId) {
                this.companyId = user.companyId;
            }
        });
    }

    addUser() {
        if (!this.companyId) {
            alert('Company ID not found. Please log in again.');
            return;
        }

        if (!this.firstName || !this.lastName || !this.email || !this.password) {
            alert('Please fill in all required fields.');
            return;
        }

        this.isLoading = true;

        const userData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: this.role,
            companyId: this.companyId
        };

        this.store.dispatch(UserActions.createUser({ userData }));

        // Reset form
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.role = 'USER';
        this.isLoading = false;
    }
}
