"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareChartComponent = void 0;
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
        this.addCustomUser = function (term) { return ({ id: term, name: term }); };
        this.packofTickers = [];
        this.packofIndicators = [];
        /*
        this.chartOptions = {
          series: [],
          chart: {
              type: 'line',
              height: 350,
              animations: {
                  enabled: false,
              },
          },
          xaxis: {
            tickAmount: 6,
            categories: [],
            labels: {
                show: true,
            },
        }*/
        this.chartOptions = {
            chart: {
                height: 380,
                width: "100%",
                type: "line"
            },
            series: [],
            xaxis: {
                tickAmount: 6,
                categories: [],
                labels: {
                    show: true
                }
                /*
                type: "datetime",
                //min: new Date("01 Mar 2012").getTime(),
                tickAmount: 6,
                categories: [],
        
                labels: {
                  show: true,
                  //format: "dd/MM",
                  formatter: function (timestamp) {
                    var options = {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    };
                    var today = new Date(timestamp);
                    //return new Date(timestamp); // The formatter function overrides format property
                    return today.toLocaleDateString("es-AR");
                  },
                  datetimeFormatter: {
                    year: "YY",
                    month: "MMM 'yy",
                    day: "dd",
                    hour: "HH:mm",
                  },
                 */
            }
            /*
              labels: {
                format: "dd/MM",
              },*/
        };
    }
    ShareChartComponent.prototype.ngOnInit = function () {
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
        console.log('getDropdowntData');
        this.getDropdowntData();
        console.log('getIndicatorData');
        this.getIndicatorData();
        //this.namex = "da";
        //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
        //this.isDataAvailable = true;
    };
    ShareChartComponent.prototype.onChange = function ($event) {
        console.log('lo que seleccionaste');
        console.log({ name: "(change)", value: $event });
        console.log($event.ticker);
        //console.log(e)
        this.ticker = $event.ticker;
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    };
    ShareChartComponent.prototype.onChangeIndicator = function ($event) {
        console.log('lo que seleccionaste');
        console.log({ name: "(change)", value: $event });
        console.log($event);
        //console.log(e)
        this.indicator = $event;
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    };
    ShareChartComponent.prototype.getCandleChartData = function (ticker, selectedIndicator) {
        var _this = this;
        this.pythonApi.accion(ticker, selectedIndicator).subscribe(function (data) {
            _this.updateSeries(data);
            //this.chartOptions.series = data.data;
            _this.updateTime(data);
            _this.candleChartName = data.name;
            _this.shareChartIndicator = data.indicator;
            _this.candleChartTicker = data.ticker;
            _this.isDataAvailable = true;
            _this.collapseInactive = false;
            _this.chartIsCollapsed = false;
        });
    };
    ShareChartComponent.prototype.updateSeries = function (dataGET) {
        //var dataGetted: [{ name: any; data: any[] }?];
        //dataGetted = dataGET.data;
        //console.log(dataGetted);
        this.chartOptions.series = dataGET.data;
        console.log(dataGET.data);
    };
    ShareChartComponent.prototype.updateTime = function (datesGET) {
        //console.log('date');
        //console.log(datesGET.date);
        //var test = Object.values(datesGET.date);
        //console.log('test');
        //console.log(test);
        this.chartOptions.xaxis.categories = datesGET.date;
        console.log(datesGET.date);
        console.log(this.chartOptions);
    };
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
            _this.packofIndicators = Object.keys(data.indicators);
            _this.Indicators = _this.packofIndicators;
            //this.isDataAvailable = true;
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
            //this.isDataAvailable = true;
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
