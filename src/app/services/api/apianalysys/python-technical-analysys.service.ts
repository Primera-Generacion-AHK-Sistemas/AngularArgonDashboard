import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env, environment } from '../../../../environments/environment';

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
    //private baseUrl = 'https://pythonapiar.herokuapp.com/'; //?ticker=AAPL&indicator=atx
    private baseUrl = environment.apis.technicalAnalisysApi; //?ticker=AAPL&indicator=atx
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
        const url = this.baseUrl+ 'api/technical-analysis-between';
        console.log("environment.production - Logs false for default environment"); // Logs false for default environment
        console.log(environment.production); // Logs false for default environment
        return this.http.get(url, { headers: headers, params: params });
    }
    getCEDEARS(){
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );
        const params = new HttpParams();
        //const url = this.baseUrl;
        const url = this.baseUrl + 'api/data';
        return this.http.get(url, { headers: headers, params: params });
    }
}
