import { createReducer, on } from "@ngrx/store";
import * as CompanyActions from "./company.actions";
import { Company } from "../../core/services/company.service";

export interface CompanyState {
    companies: Company[];
    loading: boolean;
    error: string | null;
}

export const initialState: CompanyState = {
    companies: [],
    loading: false,
    error: null
};

export const companyReducer = createReducer(
    initialState,
    on(CompanyActions.createCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(CompanyActions.createCompanySuccess, (state, { company }) => ({
        ...state,
        companies: [...state.companies, company],
        loading: false
    })),
    on(CompanyActions.createCompanyFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(CompanyActions.loadCompanies, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(CompanyActions.loadCompaniesSuccess, (state, { companies }) => ({
        ...state,
        companies,
        loading: false
    })),
    on(CompanyActions.loadCompaniesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(CompanyActions.getCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(CompanyActions.getCompanySuccess, (state, { company }) => ({
        ...state,
        loading: false,
        companies: state.companies.some(c => c.id === company.id)
            ? state.companies.map(c => c.id === company.id ? company : c)
            : [...state.companies, company]
    })),
    on(CompanyActions.getCompanyFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
