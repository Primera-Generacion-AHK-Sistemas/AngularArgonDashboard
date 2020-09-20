import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PythonDataService {
    today: number = Date.now();
    private baseUrl = 'https://flask-yahoo-fin.herokuapp.com/api/';
    constructor(private http: HttpClient) {}

    accion(auctionName: string, todayDate: string, aYearAgo: string) {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );

        let params = new HttpParams()
            .set('ticker', auctionName)
            .set('start_date', aYearAgo)
            .set('end_date', todayDate);
        const url = this.baseUrl + 'price-between';
        return this.http.get(url, { headers: headers, params: params });
    }
}
