import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompanyState } from "./company.reducer";

export const selectCompanyState = createFeatureSelector<CompanyState>("company");

export const selectCompanies = createSelector(
    selectCompanyState,
    (state: CompanyState) => state.companies
);

export const selectCompanyLoading = createSelector(
    selectCompanyState,
    (state: CompanyState) => state.loading
);

export const selectCompanyError = createSelector(
    selectCompanyState,
    (state: CompanyState) => state.error
);

export const selectCompanyById = (id: number) => createSelector(
    selectCompanies,
    (companies) => companies.find(company => company.id === id)
);
