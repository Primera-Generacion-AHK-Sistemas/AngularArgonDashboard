import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class JavaDataService {
    private baseUrl = 'https://spring-boot-auth0-api.herokuapp.com/api';
    constructor(private http: HttpClient) {}

    buscarTodosLosCedears() {
        const url = this.baseUrl + '/asset/all';
        return this.http.get(url);
    }

    getUserInfo() {
        const url = this.baseUrl + '/user/details';
        return this.http.get(url);
    }
}
