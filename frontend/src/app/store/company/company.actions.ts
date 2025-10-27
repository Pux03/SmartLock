import { createAction, props } from "@ngrx/store";
import { Company } from "../../core/services/company.service";

export const createCompany = createAction(
    '[Company] Create Company',
    props<{ name: string }>()
);

export const createCompanySuccess = createAction(
    '[Company] Create Company Success',
    props<{ company: Company }>()
);

export const createCompanyFailure = createAction(
    '[Company] Create Company Failure',
    props<{ error: string }>()
);

export const loadCompanies = createAction(
    '[Company] Load Companies'
);

export const loadCompaniesSuccess = createAction(
    '[Company] Load Companies Success',
    props<{ companies: Company[] }>()
);

export const loadCompaniesFailure = createAction(
    '[Company] Load Companies Failure',
    props<{ error: string }>()
);

export const getCompany = createAction(
    '[Company] Get Company',
    props<{ id: number }>()
);

export const getCompanySuccess = createAction(
    '[Company] Get Company Success',
    props<{ company: Company }>()
);

export const getCompanyFailure = createAction(
    '[Company] Get Company Failure',
    props<{ error: string }>()
);
