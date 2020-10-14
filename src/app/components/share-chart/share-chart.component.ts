import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexYAxis,
    ApexXAxis,
    ApexTitleSubtitle,
} from 'ng-apexcharts';

//import dayjs from 'dayjs'

import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
}

@Component({
    selector: 'app-share-chart',
    templateUrl: './share-chart.component.html',
    styleUrls: ['./share-chart.component.scss'],
    providers: [DatePipe],
})
export class ShareChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    candleChartTicker: '';
    candleChartName: '';
    shareChartIndicator: '';
    isDataAvailable = false;
    chartIsCollapsed = true;
    collapseInactive = true;

    public packofTickers: [{ name: any; ticker: any }?];
    public packofIndicators: string[];
    Tickers: any = [];
    Indicators: string[];

    //#region datesButtons
    oneYearBtn = false;
    oneMonthBtn = false;
    oneWeekBtn = false;
    ticker: string = 'TSLA';
    indicator: string = 'adx';
    //#endregion

    constructor(
        private pythonApi: PythonTechnicalAnalysysDataService,
        private datePipe: DatePipe
    ) {
        this.packofTickers = [];
        this.packofIndicators = [];
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
                categories: [],
                //type: 'datetime',
                /*
                labels: {
                    formatter: function (val) {
                        //import dayjs from 'dayjs' // ES 2015
                        //dayjs().format()
                        //val = dayjs(val).format('YYYY/MM/DD')
                        //var somevar = dayjs(val).format('YYYY/MM/DD')
                        // console.log(somevar)
                        return val
                    }
                }*/
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
                decimalsInFloat: undefined,
                labels: {
                    formatter: function (val, index) {
                        return val.toFixed(2);
                    },
                },
            },
        };
    }

    ngOnInit() {
        this.getCandleChartData(
            this.ticker,
            this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
        console.log('getDropdowntData');
        this.getDropdowntData();
        console.log('getIndicatorData');
        this.getIndicatorData();
        //this.namex = "da";
        //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
        //this.isDataAvailable = true;
    }

    getCandleChartData(ticker: string, selectedIndicator: string) {
        this.pythonApi
            .accion(ticker, selectedIndicator)
            .subscribe((data: any) => {
                this.updateTime(data);
                this.updateSeries(data);
                this.candleChartName = data.name;
                this.shareChartIndicator = data.indicator;
                this.candleChartTicker = data.ticker;
                this.isDataAvailable = true;
            });
    }
    onKeyUpEventonKeyUpEventTicker(event: any) {
        this.ticker = event.target.value;
        console.log(this.ticker);
        this.getCandleChartData(this.ticker, this.indicator);
    }
    onKeyUpEventonKeyUpEventIndicator(event: any) {
        this.indicator = event.target.value;
        console.log(this.indicator);
        this.getCandleChartData(this.ticker, this.indicator);
    }
    updateChartWith(date: Date) {
        //this.isDataAvailable = false;
        //this.getCandleChartData(this.ticker, this.indicator);
    }

    public updateSeries(dataGET: {
        name: any;
        indicator: any;
        values: any;
        data: any;
        date: any;
    }) {
        console.log(dataGET.name);
        console.log('odex');

        for (let index = 0; index < this.chartOptions.series.length; index++) {
            //const element = this.chartOptions.series[index];
            console.log('index');
            console.log(index);
            //this.chartOptions.series[index].pop()
            this.chartOptions.series.splice(index, 1);
            //this.chartOptions.series[index];
            console.log(this.chartOptions.series[index]);
        }
        /*
         */
        //this.chartOptions.series.pop()
        console.log(dataGET);
        var values: {
            name: any;
            indicator: any;
            values: any;
            data: any;
            date: any;
        };
        /*
        ticker	"AMD"
        name	"Advanced Micro Devices, Inc."
        indicator	"adx"
        values	[…]
        data	{…}
        date	[…]
        */
        values = dataGET;
        var megaentry: ApexAxisChartSeries = [];
        //var megaentry: [{ name?: string;data: number[]}];
        console.log('megaentry');
        //{ name?: string; type?: string; color?: string; data: number[] | { x: any; y: any; fillColor?: string; strokeColor?: string; }[] | [number, number][] | [number, number[]][]; }
        console.log(megaentry);
        //var megaentry: ApexAxisChartSeries = {[number, (number | null)[]][]}
        //var megaentry = array();
        //var megaentry : new Array();
        //var megaentry[:any];        //declaration
        var num: number = 0;
        var index: number;
        var factorial = 1;
        var numlenght: number = Object.values(values.data).length;
        console.log('numlenght');
        console.log(numlenght);

        for (index = num; index < numlenght; index++) {
            //factorial *= index;

            console.log('element');
            console.log(index);
            var namename = values.values[index];
            console.log(namename);
            console.log(typeof namename);
            //namename = String(namename);
            //console.log(namename);

            console.log('values');
            var array_of_values_obj: [] = values.data[namename];
            //console.log(array_of_values_obj);
            //array_of_values_obj = Array(
            // var array = Object.keys(array_of_values_obj).map(function(key) {return [key,array_of_values_obj[key]]});

            //var array = $.map(array_of_values_obj, function(value, index) {return [value];});

            console.log(typeof array_of_values_obj);
            console.log(array_of_values_obj);
            // https://www.tutorialcup.com/javascript/object-to-array-in-javascript.htm
            var newentry: { name: string; data: number[] } = {
                name: namename,
                data: array_of_values_obj,
            };
            //persons["p1"] = { firstName: "F1", lastName: "L1" };
            //persons["p2"] = { firstName: "F2" }; // will result in an error

            //var newentry: {} = {name:any,data:any};
            //newentry.name = namename;
            //newentry.data = array_of_values_obj;
            console.log('newentry');
            console.log(newentry);

            console.log('pushing megaentry');
            megaentry.push(newentry);
            //this.chartOptions.series.push(newentry);

            //this.chartOptions.series.push(newentry);
            console.log('megaentry');
            console.log(megaentry);
            this.chartOptions.series = megaentry;
            //newentry = {"name": namename, "data": array_of_values_obj}
        }

        //console.log("megaentry");
        //console.log(megaentry);
        console.log(this.chartOptions.series);
        //this.chartOptions.series = megaentry;
        console.log(this.chartOptions);
    }
    public updateTime(datesGET: {
        name: any;
        indicator: any;
        values: any;
        data: any;
        date: any;
    }) {
        console.log('date');
        console.log(datesGET.date);
        var test = Object.values(datesGET.date);
        console.log('test');
        console.log(test);

        this.chartOptions.xaxis.categories = datesGET.date;
        console.log(this.chartOptions);
    }

    public updateSeriesSync() {
        this.chartOptions.series = [
            {
                data: [23, 44, 1, 22],
            },
        ];
    }

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
    changeTickers(e) {
        console.log('lo que seleccionaste');
        console.log(e.target.value);
        //console.log(e)
        this.ticker = e.target.value;
        this.getCandleChartData(
            this.ticker,
            this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    }
    changeIndicator(e) {
        console.log('lo que seleccionaste');
        console.log(e.target.value);
        this.indicator = e.target.value;
        this.getCandleChartData(
            this.ticker,
            this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    }

    getIndicatorData() {
        this.pythonApi.getCEDEARS().subscribe((data: any) => {
            //this.updateSeries(data);
            //this.updateTime(data);

            console.log('get Indicators Data');

            console.log(data.indicators);

            //var array_of_values: any = []
            //console.log(keysss);

            this.packofIndicators = Object.keys(data.indicators);
            //console.log(data.indicators)
            //this.namex = "da";
            this.Indicators = this.packofIndicators;
            this.isDataAvailable = true;
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
    }
    getDropdowntData() {
        this.pythonApi.getCEDEARS().subscribe((data: any) => {
            //this.updateSeries(data);
            //this.updateTime(data);

            console.log(data.indicators);
            console.log('odex');

            console.log('values');
            //var array_of_values: any = []

            for (let index = 0; index < data.cedears.length; index++) {
                //const element = this.chartOptions.series[index];
                //console.log("index");
                //console.log(index);
                //this.chartOptions.series[index].pop()
                //this.chartOptions.series[index];
                //console.log(data.cedears[index].nombre);
                //array_of_values.push(data.cedears[index].nombre);

                var newentry: { name: string; ticker: string } = {
                    name: data.cedears[index].nombre,
                    ticker: data.cedears[index].ticker,
                };
                this.packofTickers.push(newentry);
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
            this.Tickers = this.packofTickers;
            this.isDataAvailable = true;
        });
    }
}
