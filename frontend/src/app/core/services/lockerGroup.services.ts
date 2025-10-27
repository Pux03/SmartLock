import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const api = environment.apiUrl;

export interface LockerGroup {
    id: number;
    name: string;
    companyId: number;
    lockers: any[];
}

@Injectable({
    providedIn: 'root'
})
export class LockerGroupServices {
    private http = inject(HttpClient);

    createLockerGroup(name: string, companyId: number) {
        const locker = { company: { id: companyId } };
        console.log(locker);
        return this.http.post<LockerGroup>(`${api}/locker-group`, {
            name,
            company: { id: companyId }
        });
    }

    getLockerGroups(companyId: number) {
        return this.http.get<LockerGroup[]>(`${api}/locker-group/company/${companyId}`);
    }

    getLockerGroup(id: number) {
        return this.http.get<LockerGroup>(`${api}/locker-group/${id}`);
    }

    updateLockerGroup(id: number, data: Partial<LockerGroup>) {
        return this.http.patch<LockerGroup>(`${api}/locker-group/${id}`, data);
    }

    deleteLockerGroup(id: number) {
        return this.http.delete(`${api}/locker-group/${id}`);
    }
}
