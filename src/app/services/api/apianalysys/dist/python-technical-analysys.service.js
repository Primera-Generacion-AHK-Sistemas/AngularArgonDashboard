"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PythonTechnicalAnalysysDataService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var PythonTechnicalAnalysysDataService = /** @class */ (function () {
    function PythonTechnicalAnalysysDataService(http) {
        this.http = http;
        this.today = Date.now();
        //private baseUrl = 'https://flask-yahoo-fin.herokuapp.com/api/';
        //private baseUrl = 'http://127.0.0.1:8000/api/ta'; //?ticker=AMD&indicator=atx
        //var link = "http://127.0.0.1:8000/api/ta/?ticker=AMD&indicator=stoch";
        //var link = "http://127.0.0.1:8000/api?ticker=" + ticker + "&indicator=" + indicator;
        //private baseUrl = 'http://127.0.0.1:8000/api'; //?ticker=" + ticker + "&indicator=" + indicator;
        // private baseUrl = 'https://pythonapiar.herokuapp.com/'; //?ticker=AAPL&indicator=atx
        this.baseUrl = environment_1.environment.apis.technicalAnalisysApi; //?ticker=AAPL&indicator=atx
    }
    PythonTechnicalAnalysysDataService.prototype.accion = function (auctionName, selectedIndicator) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        var params = new http_1.HttpParams()
            .set('ticker', auctionName)
            .set('indicator', selectedIndicator);
        //const url = this.baseUrl + 'price-between';
        var url = this.baseUrl + 'api/technical-analysis-between';
        console.log("environment.production - Logs false for default environment"); // Logs false for default environment
        console.log(environment_1.environment.production); // Logs false for default environment
        return this.http.get(url, { headers: headers, params: params });
    };
    PythonTechnicalAnalysysDataService.prototype.getCEDEARS = function () {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        var params = new http_1.HttpParams();
        //const url = this.baseUrl;
        var url = this.baseUrl + 'api/data';
        return this.http.get(url, { headers: headers, params: params });
    };
    PythonTechnicalAnalysysDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PythonTechnicalAnalysysDataService);
    return PythonTechnicalAnalysysDataService;
}());
exports.PythonTechnicalAnalysysDataService = PythonTechnicalAnalysysDataService;
