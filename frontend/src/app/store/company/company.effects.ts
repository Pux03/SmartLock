import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as CompanyActions from "./company.actions";
import { CompanyService } from "../../core/services/company.service";

@Injectable()
export class CompanyEffects {
    private actions$ = inject(Actions);
    private companyService = inject(CompanyService);

    createCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.createCompany),
            mergeMap(({ name }) =>
                this.companyService.createCompany({ name }).pipe(
                    map((company) => CompanyActions.createCompanySuccess({ company })),
                    catchError((error) => of(CompanyActions.createCompanyFailure({ error: error.message })))
                )
            )
        )
    );

    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.loadCompanies),
            mergeMap(() =>
                this.companyService.loadCompanies().pipe(
                    map((companies) => CompanyActions.loadCompaniesSuccess({ companies })),
                    catchError((error) => of(CompanyActions.loadCompaniesFailure({ error: error.message })))
                )
            )
        )
    );

    getCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.getCompany),
            mergeMap(({ id }) =>
                this.companyService.getCompany(id).pipe(
                    map((company) => CompanyActions.getCompanySuccess({ company })),
                    catchError((error) => of(CompanyActions.getCompanyFailure({ error: error.message })))
                )
            )
        )
    );
}
