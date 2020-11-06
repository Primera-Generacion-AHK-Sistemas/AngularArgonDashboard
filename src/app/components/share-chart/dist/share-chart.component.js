"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareChartComponent = void 0;
var dayjs_1 = require("dayjs");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ShareChartComponent = /** @class */ (function () {
    function ShareChartComponent(pythonApi, datePipe) {
        this.pythonApi = pythonApi;
        this.datePipe = datePipe;
        this.isDataAvailable = false;
        this.chartIsCollapsed = true;
        this.collapseInactive = true;
        this.Tickers = [];
        this.oneYearBtn = false;
        this.oneMonthBtn = false;
        this.oneWeekBtn = false;
        this.ticker = 'TSLA';
        this.indicator = 'adx';
        this.addCustomUser = function (term) { return ({ id: term, name: term }); };
        this.packofTickers = [];
        this.packofIndicators = [];
        this.chartOptions = {
            chart: {
                height: 380,
                width: "100%",
                type: "line"
            },
            colors: [],
            annotations: {},
            series: [],
            xaxis: {
                tickAmount: 6,
                categories: [],
                labels: {
                    show: true,
                    formatter: function (val) {
                        var valor = dayjs_1["default"](val).format('DD/MM/YYYY');
                        return valor;
                    }
                }
            }
        };
    }
    ShareChartComponent.prototype.ngOnInit = function () {
        this.getCandleChartData(this.ticker, this.indicator);
        this.getDropdowntData();
        this.getIndicatorData();
    };
    ShareChartComponent.prototype.onChange = function ($event) {
        this.ticker = $event.ticker;
        this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.onChangeIndicator = function ($event) {
        this.indicator = $event;
        this.getCandleChartData(this.ticker, this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    };
    ShareChartComponent.prototype.getCandleChartData = function (ticker, selectedIndicator) {
        var _this = this;
        this.pythonApi.accion(ticker, selectedIndicator).subscribe(function (data) {
            _this.updateChartOptions(data);
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
    /**
     * name
     */
    ShareChartComponent.prototype.updateChartOptions = function (dataGET) {
        console.log(dataGET.indicator);
        switch (dataGET.indicator) {
            case "adx":
                console.log("Índice de movimiento direccional (DMI)");
                this.chartOptions.colors = ["#775dd0", "#00e396", "#ff4560"];
                this.chartOptions.annotations = { yaxis: [{ y: 25,
                            borderColor: "#000000",
                            label: {
                                borderColor: "#000000",
                                style: {
                                    color: "#000000",
                                    background: "#000000"
                                }
                            }
                        },
                    ]
                };
                break;
            case "stoch":
                console.log("Indicador Estocástico");
                this.chartOptions.colors = ["#00e396", "#ff4560"];
                this.chartOptions.annotations = {
                    yaxis: [
                        {
                            y: 20,
                            borderColor: "#000000",
                            label: {
                                borderColor: "#000000",
                                style: {
                                    color: "#000000",
                                    background: "#000000"
                                }
                            }
                        },
                        {
                            y: 80,
                            borderColor: "#000000",
                            label: {
                                borderColor: "#000000",
                                style: {
                                    color: "#000000",
                                    background: "#000000"
                                }
                            }
                        },
                    ]
                };
                break;
            case "bbands":
                console.log("Bollinger Bands");
                this.chartOptions.colors = ["#00e396", "#7eb9e0", "#feb019", "#008ffb"];
                this.chartOptions.annotations = {};
                break;
            case "atx":
                console.log("Average True Range (ATR)");
                this.chartOptions.colors = ["#feb019"];
                this.chartOptions.annotations = {};
                break;
            default:
                console.log("anyone");
                this.chartOptions.colors = [];
                this.chartOptions.annotations = {};
                break;
        }
        console.log("Options");
        console.log(this.chartOptions);
    };
    ShareChartComponent.prototype.updateSeries = function (dataGET) {
        //var dataGetted: [{ name: any; data: any[] }?];
        //dataGetted = dataGET.data;
        //console.log(dataGetted);
        this.chartOptions.series = dataGET.data;
        //console.log(dataGET.data);
    };
    ShareChartComponent.prototype.updateTime = function (datesGET) {
        this.chartOptions.xaxis.categories = datesGET.date;
    };
    ShareChartComponent.prototype.changeTickers = function (e) {
        this.ticker = e.target.value;
        this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.changeIndicator = function (e) {
        this.indicator = e.target.value;
        this.getCandleChartData(this.ticker, this.indicator);
    };
    ShareChartComponent.prototype.getIndicatorData = function () {
        var _this = this;
        this.pythonApi.getCEDEARS().subscribe(function (data) {
            _this.packofIndicators = Object.keys(data.indicators);
            _this.Indicators = _this.packofIndicators;
        });
    };
    ShareChartComponent.prototype.getDropdowntData = function () {
        var _this = this;
        this.pythonApi.getCEDEARS().subscribe(function (data) {
            for (var index = 0; index < data.cedears.length; index++) {
                var newentry = {
                    name: data.cedears[index].nombre,
                    ticker: data.cedears[index].ticker
                };
                _this.packofTickers.push(newentry);
            }
            _this.Tickers = _this.packofTickers;
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
