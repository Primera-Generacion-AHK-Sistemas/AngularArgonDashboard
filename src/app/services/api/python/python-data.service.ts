import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PythonDataService {
    today: number = Date.now();
    private baseUrl = 'https://ahk-stock-market-api.herokuapp.com/api/';
    HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) {}

    getCedearBetweenDates(auctionName: string, selectedDate: string, todayDate: string): Observable<any> {
        const params = new HttpParams()
            .set('ticker', auctionName)
            .set('start_date', selectedDate)
            .set('end_date', todayDate);
        const url = this.baseUrl + 'price-between';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }

    getCedearDollarPrices(auctionName: string): Observable<any> {
        const params = new HttpParams().set('ticker', auctionName);
        const url = this.baseUrl + 'ccl-cedear-dollar';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }

    getCedearTechnicalAnalysis(auctionName: string): Observable<any> {
        const params = new HttpParams().set('ticker', auctionName);
        const url = this.baseUrl + 'simple-technical-analysis';
        return this.http.get(url, { headers: this.HEADERS, params: params });
    }
}
