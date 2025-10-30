import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import * as AuthActions from "../../../store/auth/auth.actions";
import * as CompanyActions from "../../../store/company/company.actions";
import { selectError } from "../../../store/auth/auth.selectors";
import { selectCompanies, selectCompanyError, selectCompanyLoading } from "../../../store/company/company.selectors";
import { logout } from "../../../store/auth/auth.actions";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./register.html",
    styleUrls: ["./register.css"]
})
export class Register {
    firstName = "";
    lastName = "";
    email = "";
    password = "";
    companyName = "";
    errorMessage = "";
    isLoading = false;
    private latestCompanyId: number | null = null;

    constructor(private store: Store, private router: Router) {
        this.store.select(selectError).subscribe((error) => {
            if (error) this.errorMessage = error;
        });

        this.store.select(selectCompanyError).subscribe((error) => {
            if (error) this.errorMessage = error;
        });

        this.store.select(selectCompanyLoading).subscribe((loading) => {
            this.isLoading = loading;
        });

        this.store.select(selectCompanies).subscribe((companies) => {
            if (companies && companies.length > 0) {
                const latestCompany = companies[companies.length - 1];
                if (latestCompany && latestCompany.id !== this.latestCompanyId) {
                    this.latestCompanyId = latestCompany.id;
                    this.store.dispatch(AuthActions.register({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        role: 'ADMIN',
                        companyId: latestCompany.id
                    }));
                }
            }
        });
    }

    onRegister() {
        if (!this.firstName || !this.lastName || !this.email || !this.password || !this.companyName) {
            this.errorMessage = "All fields are required";
            return;
        }

        this.errorMessage = "";
        this.latestCompanyId = null;

        this.store.dispatch(CompanyActions.createCompany({ name: this.companyName }));
    }

    logout() {
        this.store.dispatch(logout());
    }
}
