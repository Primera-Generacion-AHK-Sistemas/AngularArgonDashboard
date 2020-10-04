import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PythonDataService {
    today: number = Date.now();
    private baseUrl = 'https://flask-yahoo-fin.herokuapp.com/api/';
    private baseUrlLocal = 'http://127.0.0.1:5000/api/';
    HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) {}

    getCedearBetweenDates(auctionName: string, selectedDate: string, todayDate: string) {
        const params = new HttpParams()
            .set('ticker', auctionName)
            .set('start_date', selectedDate)
            .set('end_date', todayDate);
        const url = this.baseUrl + 'price-between';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }

    getCedearDollarPrices(auctionName: string) {
        const params = new HttpParams().set('ticker', auctionName);
        const url = this.baseUrlLocal + 'ccl-cedear-dollar';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }

    getCedearTechnicalAnalysis(auctionName: string, indicator: string) {
        const params = new HttpParams().set('ticker', auctionName).set('indicator', indicator);
        const url = this.baseUrlLocal + 'ta';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }
}
