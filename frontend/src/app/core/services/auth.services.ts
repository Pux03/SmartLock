import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private store = inject(Store);

    getCompanyId(): number | null {
        let companyId: number | null = null;
        this.store.select(selectUser).subscribe(user => {
            if (user && user.companyId) {
                companyId = user.companyId;
            }
        });
        return companyId;
    }

    getCurrentUser() {
        let currentUser = null;
        this.store.select(selectUser).subscribe(user => {
            currentUser = user;
        });
        return currentUser;
    }
}
