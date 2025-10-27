import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';

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
        // TODO: Implement user creation logic
        console.log('Adding user:', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: this.role,
            companyId: this.companyId
        });

        // Reset form
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.role = 'USER';
    }
}
