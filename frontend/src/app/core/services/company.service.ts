import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const api = environment.apiUrl;

export interface CreateCompanyDto {
    name: string;
}

export interface Company {
    id: number;
    name: string;
    users?: any[];
}

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private http = inject(HttpClient);

    createCompany(companyData: CreateCompanyDto) {
        return this.http.post<Company>(`${api}/company`, companyData);
    }

    loadCompanies() {
        return this.http.get<Company[]>(`${api}/company`);
    }

    getCompany(id: number) {
        return this.http.get<Company>(`${api}/company/${id}`);
    }

    getCompanyUsers(companyId: number) {
        return this.http.get<any[]>(`${api}/user/company/${companyId}`);
    }

    getUsersWithoutLockers(companyId: number) {
        return this.http.get<any[]>(`${api}/user/without-lockers/${companyId}`);
    }

    createUser(userData: any) {
        return this.http.post<any>(`${api}/user`, userData);
    }

    updateUser(id: number, data: any) {
        return this.http.patch<any>(`${api}/user/${id}`, data);
    }

    deleteUser(id: number) {
        return this.http.delete(`${api}/user/${id}`);
    }
}
