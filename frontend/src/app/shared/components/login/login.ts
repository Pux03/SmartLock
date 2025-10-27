import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import * as AuthActions from "../../../store/auth/auth.actions";
import { selectAccessToken, selectError } from "../../../store/auth/auth.selectors";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./login.html",
    styleUrls: ["./login.css"]
})
export class Login {
    email = "";
    password = "";
    errorMessage = "";

    constructor(private store: Store, private router: Router) {
        this.store.select(selectError).subscribe((error) => {
            if (error) this.errorMessage = 'Invalid email or password';
        });
    }

    onLogin() {
        this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
    }
}
