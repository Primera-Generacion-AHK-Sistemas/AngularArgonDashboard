import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PythonTechnicalAnalysysDataService {
    today: number = Date.now();
    //private baseUrl = 'https://flask-yahoo-fin.herokuapp.com/api/';
    //private baseUrl = 'http://127.0.0.1:8000/api/ta'; //?ticker=AMD&indicator=atx        
    //var link = "http://127.0.0.1:8000/api/ta/?ticker=AMD&indicator=stoch";

    //var link = "http://127.0.0.1:8000/api?ticker=" + ticker + "&indicator=" + indicator;
    //private baseUrl = 'http://127.0.0.1:8000/api'; //?ticker=" + ticker + "&indicator=" + indicator;  
    private baseUrl = 'https://pythonapiar.herokuapp.com/api'; //?ticker=AAPL&indicator=atx
    constructor(private http: HttpClient) {}

    accion(auctionName: string, selectedIndicator: string) {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );

        const params = new HttpParams()
            .set('ticker', auctionName)
            .set('indicator', selectedIndicator);
        //const url = this.baseUrl + 'price-between';
        const url = this.baseUrl;
        return this.http.get(url, { headers: headers, params: params });
    }
}
