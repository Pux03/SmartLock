import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LockerData } from '../../shared/components/locker/locker';

const api = environment.apiUrl;

export interface Locker {
    id: number;
    serial: string;
    pin: string;
    x: number;
    y: number;
    status: string;
    lockerGroupId: number;
}

@Injectable({
    providedIn: 'root'
})
export class LockerServices {
    private http = inject(HttpClient);

    addLockers(lockers: any[]) {
        return this.http.post<Locker[]>(`${api}/locker/add-lockers`, lockers);
    }

    getLockers(lockerGroupId: number) {
        return this.http.get<Locker[]>(`${api}/locker/group/${lockerGroupId}`);
    }

    updateLocker(id: number | string, data: Partial<Locker>) {
        return this.http.patch<Locker>(`${api}/locker/${id}`, data);
    }

    deleteLocker(id: number | string) {
        return this.http.delete(`${api}/locker/${id}`);
    }

    getLocker(id: number) {
        return this.http.get<Locker>(`${api}/locker/${id}`);
    }
}
