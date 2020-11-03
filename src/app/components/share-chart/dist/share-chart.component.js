"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareChartComponent = void 0;
//import dayjs from 'dayjs'
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ShareChartComponent = /** @class */ (function () {
    //#endregion
    function ShareChartComponent(pythonApi, datePipe) {
        this.pythonApi = pythonApi;
        this.datePipe = datePipe;
        this.isDataAvailable = false;
        this.chartIsCollapsed = true;
        this.collapseInactive = true;
        this.Tickers = [];
        //#region datesButtons
        this.oneYearBtn = false;
        this.oneMonthBtn = false;
        this.oneWeekBtn = false;
        this.ticker = 'TSLA';
        this.indicator = 'adx';
        this.packofTickers = [];
        this.packofIndicators = [];
        this.chartOptions = {
            chart: {
                height: 380,
                width: "100%",
                type: "line"
            },
            series: [],
            xaxis: {
                type: "datetime",
                //min: new Date("01 Mar 2012").getTime(),
                tickAmount: 6,
                categories: [],
                labels: {
                    //format: "YYYY/MM/DD",
                    formatter: function (timestamp) {
                        var options = {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        };
                        var today = new Date(timestamp);
                        //return new Date(timestamp); // The formatter function overrides format property
                        return today.toLocaleDateString("es-AR");
                    },
                    datetimeFormatter: {
                        year: "YYYY",
                        month: "MM",
                        day: "dd",
                        hour: "HH:mm"
                    }
                }
            }
        };
    }
    ShareChartComponent.prototype.ngOnInit = function () {
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
        //console.log('getDropdowntData');
        this.getDropdowntData();
        //console.log('getIndicatorData');
        this.getIndicatorData();
        //this.namex = "da";
        //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
        //this.isDataAvailable = true;
    };
    ShareChartComponent.prototype.getCandleChartData = function (ticker, selectedIndicator) {
        var _this = this;
        this.pythonApi
            .accion(ticker, selectedIndicator)
            .subscribe(function (data) {
            _this.updateSeries(data);
            //this.updateTime(data);
            _this.candleChartName = data.name;
            _this.shareChartIndicator = data.indicator;
            _this.candleChartTicker = data.ticker;
            _this.isDataAvailable = true;
        });
    };
    ShareChartComponent.prototype.onKeyUpEventonKeyUpEventTicker = function (event) {
        this.ticker = event.target.value;
        //console.log(this.ticker);
        this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.onKeyUpEventonKeyUpEventIndicator = function (event) {
        this.indicator = event.target.value;
        //console.log(this.indicator);
        this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.updateChartWith = function (date) {
        //this.isDataAvailable = false;
        //this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.updateSeries = function (dataGET) {
        var megaentry;
        megaentry = dataGET.data;
        this.chartOptions.series = megaentry;
        //console.log(dataGET.date)
        //console.log(dataGET.date)
        this.chartOptions.xaxis.categories = dataGET.date;
        //this.chartOptions.xaxis.categories = dataGET.date;
    };
    ShareChartComponent.prototype.updateTime = function (datesGET) {
        //this.chartOptions.xaxis.categories = datesGET.date
    };
    ShareChartComponent.prototype.updateSeriesSync = function () {
    };
    //#region Dates
    // Dates
    /*
    todayDate() {
        return new Date();
    }
    */
    /*
    aYearAgoDate(date: Date) {
        return new Date(date.setFullYear(date.getFullYear() - 1));
    }
    aMonthAgoDate(date: Date) {
        return new Date(date.setMonth(date.getMonth() - 1));
    }
    aWeekAgoDate(date: Date) {
        return new Date(date.setDate(date.getDate() - 7));
    }

    // Date Pipes

    dateToDatePipe(date: Date) {
        return this.datePipe.transform(date, 'yyyy/MM/dd');
    }

    todayDateToDatePipe() {
        return this.datePipe.transform(Date.now(), 'yyyy/MM/dd');
    }
    */
    //#endregion
    // Choose city using select dropdown
    ShareChartComponent.prototype.changeTickers = function (e) {
        console.log('lo que seleccionaste');
        console.log(e.target.value);
        //console.log(e)
        this.ticker = e.target.value;
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    };
    ShareChartComponent.prototype.changeIndicator = function (e) {
        console.log('lo que seleccionaste');
        console.log(e.target.value);
        this.indicator = e.target.value;
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    };
    ShareChartComponent.prototype.getIndicatorData = function () {
        var _this = this;
        this.pythonApi.getCEDEARS().subscribe(function (data) {
            //this.updateSeries(data);
            //this.updateTime(data);
            console.log('get Indicators Data');
            console.log(data.indicators);
            //var array_of_values: any = []
            //console.log(keysss);
            _this.packofIndicators = Object.keys(data.indicators);
            //console.log(data.indicators)
            //this.namex = "da";
            _this.Indicators = _this.packofIndicators;
            _this.isDataAvailable = true;
            /*
            for (let index = 0; index < data.indicators.length; index++) {
                //const element = this.chartOptions.series[index];
                //console.log("index");
                //console.log(index);
                //this.chartOptions.series[index].pop()
                //this.chartOptions.series[index];
                //console.log(data.cedears[index].nombre);
                //array_of_values.push(data.cedears[index].nombre);
                console.log("indicators");
                console.log(data.indicators[index])
                var keys = Object.keys(data.indicators[index]);
                console.log(keys)
                //var newentry: { name: string; ticker:string; } = { name: data.cedears[index].nombre, ticker: data.cedears[index].ticker };
                //this.packoftickers.push(newentry)
            }
            */
            /*
             */
            //this.chartOptions.series.pop()
            //console.log(dataGET);
            //var values: { name: any, indicator: any, values: any, data: any, date: any };
            /*
            ticker	"AMD"
            name	"Advanced Micro Devices, Inc."
            indicator	"adx"
            values	[…]
            data	{…}
            date	[…]
            */
            //values = dataGET;
            //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
            //this.City = this.packoftickers;
            //this.isDataAvailable = true;
        });
    };
    ShareChartComponent.prototype.getDropdowntData = function () {
        var _this = this;
        this.pythonApi.getCEDEARS().subscribe(function (data) {
            //this.updateSeries(data);
            //this.updateTime(data);
            console.log(data.indicators);
            console.log('odex');
            console.log('values');
            //var array_of_values: any = []
            for (var index = 0; index < data.cedears.length; index++) {
                //const element = this.chartOptions.series[index];
                //console.log("index");
                //console.log(index);
                //this.chartOptions.series[index].pop()
                //this.chartOptions.series[index];
                //console.log(data.cedears[index].nombre);
                //array_of_values.push(data.cedears[index].nombre);
                var newentry = {
                    name: data.cedears[index].nombre,
                    ticker: data.cedears[index].ticker
                };
                _this.packofTickers.push(newentry);
            }
            /*
             */
            //this.chartOptions.series.pop()
            //console.log(dataGET);
            //var values: { name: any, indicator: any, values: any, data: any, date: any };
            /*
                ticker	"AMD"
                name	"Advanced Micro Devices, Inc."
                indicator	"adx"
                values	[…]
                data	{…}
                date	[…]
                */
            //values = dataGET;
            console.log('get CEDEARS');
            console.log(data.cedears);
            //this.namex = "da";
            //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
            _this.Tickers = _this.packofTickers;
            _this.isDataAvailable = true;
        });
    };
    __decorate([
        core_1.ViewChild('chart')
    ], ShareChartComponent.prototype, "chart");
    ShareChartComponent = __decorate([
        core_1.Component({
            selector: 'app-share-chart',
            templateUrl: './share-chart.component.html',
            styleUrls: ['./share-chart.component.scss'],
            providers: [common_1.DatePipe]
        })
    ], ShareChartComponent);
    return ShareChartComponent;
}());
exports.ShareChartComponent = ShareChartComponent;
