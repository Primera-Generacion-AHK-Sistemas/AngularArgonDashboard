import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class JavaDataService {
    private baseUrl = 'http://127.0.0.1:3010/api';
    constructor(private http: HttpClient) {}

    buscarTodosLosCedears() {
        const url = this.baseUrl + '/asset/all';
        return this.http.get(url);
    }
}
