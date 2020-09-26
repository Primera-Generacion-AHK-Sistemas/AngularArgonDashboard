import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserDetailsStorageService {
    constructor() {}

    searchDetailsLocalStorage() {
        return localStorage.getItem('user-details');
    }

    getDetailsObject() {
        return JSON.parse(this.searchDetailsLocalStorage());
    }

    getDetailsDashboard() {
        return JSON.parse(this.searchDetailsLocalStorage()).dashboard;
    }

    getDetailsWatchlists() {
        return JSON.parse(this.searchDetailsLocalStorage()).watchlists;
    }

    setDetailsUser(response: []) {
        localStorage.setItem('user-details', JSON.stringify(response));
    }

    removeDetailsUser() {
        localStorage.removeItem('user-details');
    }

    updateDetailsUser(response: []) {
        this.removeDetailsUser();
        this.setDetailsUser(response);
    }
}
