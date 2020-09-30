import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexYAxis,
    ApexXAxis,
    ApexTitleSubtitle,
} from 'ng-apexcharts';
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
                labels: {
                    formatter: function (value) {
                        return value;
                    },
                },
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
            this.ticker, this.indicator//this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    }

    getCandleChartData(ticker: string, selectedIndicator: string) {
        this.pythonApi
            .accion(ticker, selectedIndicator)
            .subscribe((data: any) => {
                this.updateSeries(data);
                this.updateTime(data);
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

    public updateSeries(dataGET: { name: any, indicator: any, values: any, data: any, date: any }) {


        console.log(dataGET.name);
        console.log("odex");

        for (let index = 0; index < this.chartOptions.series.length; index++) {
            //const element = this.chartOptions.series[index];
            console.log("index");
            console.log(index);
            //this.chartOptions.series[index].pop()
            this.chartOptions.series.splice(index, 1);
            //this.chartOptions.series[index];
            console.log(this.chartOptions.series[index]);
        }/*
        */
        //this.chartOptions.series.pop()
        console.log(dataGET);
        var values: { name: any, indicator: any, values: any, data: any, date: any };
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
        console.log("megaentry");
        //{ name?: string; type?: string; color?: string; data: number[] | { x: any; y: any; fillColor?: string; strokeColor?: string; }[] | [number, number][] | [number, number[]][]; }
        console.log(megaentry);
        //var megaentry: ApexAxisChartSeries = {[number, (number | null)[]][]}
        //var megaentry = array();
        //var megaentry : new Array();
        //var megaentry[:any];        //declaration 
        var num: number = 0;
        var index: number;
        var factorial = 1;
        var numlenght: number = Object.values(values.data).length
        console.log("numlenght");
        console.log(numlenght);

        for (index = num; index < numlenght; index++) {
            //factorial *= index;

            console.log("element");
            console.log(index);
            var namename = values.values[index];
            console.log(namename);
            console.log(typeof namename);
            //namename = String(namename);
            //console.log(namename);

            console.log("values");
            var array_of_values_obj: [] = values.data[namename];
            //console.log(array_of_values_obj);
            //array_of_values_obj = Array(
            // var array = Object.keys(array_of_values_obj).map(function(key) {return [key,array_of_values_obj[key]]});

            //var array = $.map(array_of_values_obj, function(value, index) {return [value];});

            console.log(typeof array_of_values_obj);
            console.log(array_of_values_obj);
            // https://www.tutorialcup.com/javascript/object-to-array-in-javascript.htm
            var newentry: { name: string; data: number[]; } = { name: namename, data: array_of_values_obj };
            //persons["p1"] = { firstName: "F1", lastName: "L1" };
            //persons["p2"] = { firstName: "F2" }; // will result in an error

            //var newentry: {} = {name:any,data:any};
            //newentry.name = namename;
            //newentry.data = array_of_values_obj;
            console.log("newentry");
            console.log(newentry);

            console.log("pushing megaentry");
            megaentry.push(newentry);
            //this.chartOptions.series.push(newentry);

            //this.chartOptions.series.push(newentry);
            console.log("megaentry");
            console.log(megaentry);
            this.chartOptions.series = megaentry;
            //newentry = {"name": namename, "data": array_of_values_obj}
        }


        //console.log("megaentry");
        //console.log(megaentry);
        console.log(this.chartOptions.series)
        //this.chartOptions.series = megaentry;
        console.log(this.chartOptions);

    }
    public updateTime(datesGET: { name: any, indicator: any, values: any, data: any, date: any }) {
        this.chartOptions.xaxis.categories = datesGET.date

    }

    public updateSeriesSync() {
        this.chartOptions.series = [{
            data: [23, 44, 1, 22]
        }];
    }

    //#region Dates

    // Dates

    todayDate() {
        return new Date();
    }

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

    //#endregion
}
