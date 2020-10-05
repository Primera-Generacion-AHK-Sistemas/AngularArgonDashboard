import { AssetDollarInfo } from './../../classes/asset-dollar-info';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { PythonDataService } from 'src/app/services/api/python/python-data.service';
import * as AOS from 'aos';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
}

export interface Cedear {
    assetType: string;
    description: string;
    id: string;
    ticker: string;
}

@Component({
    selector: 'app-candlestick-chart',
    templateUrl: './candlestick-chart.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./candlestick-chart.component.scss'],
    providers: [DatePipe],
})
export class CandlestickChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    isDataAvailable = false;
    isAnalysisDataAvailable = false;

    chartIsCollapsed = true;

    @Input()
    collapseInactive: boolean;

    @Input()
    assetIncoming: Partial<Cedear>;

    assetComplete = false;

    assetDollarData: AssetDollarInfo;

    //#region datesButtons
    oneYearBtn = false;
    oneMonthBtn = false;
    oneWeekBtn = false;
    //#endregion

    constructor(private pythonApi: PythonDataService, private datePipe: DatePipe) {
        this.chartOptions = {
            series: [
                {
                    data: [],
                },
            ],
            chart: {
                type: 'candlestick',
                height: 350,
                animations: {
                    enabled: false,
                },
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        };
        this.assetDollarData = new AssetDollarInfo();
    }

    ngOnInit() {
        setTimeout(function () {
            AOS.init();
        }, 100);
    }

    getCandleChartData(ticker: string, selectedDate: string) {
        this.pythonApi
            .getCedearBetweenDates(ticker, selectedDate, this.todayDateToDatePipe())
            .subscribe((data: any) => {
                this.updateSeries(data.data);
                this.getDollarsData(data.ticker);
                this.assetIncoming.description = data.name;
                this.assetIncoming.ticker = data.ticker;
                this.isDataAvailable = true;
            });
    }

    updateChartWith(date: Date) {
        this.isDataAvailable = false;
        this.getCandleChartData(this.assetIncoming.ticker, this.dateToDatePipe(date));
    }

    public updateSeries(dataGET: []) {
        this.chartOptions.series = [
            {
                data: dataGET,
            },
        ];
    }

    getFirstDataOfChart() {
        this.getCandleChartData(this.assetIncoming.ticker, this.dateToDatePipe(this.aMonthAgoDate(new Date())));
    }

    assetIsCharged(): boolean {
        Object.keys(this.assetIncoming).forEach((key) => {
            if (this.assetIncoming[key] == null) {
                console.log('False');
            }
        });
        return true;
    }

    //#region CardAnalysis

    getDollarsData(ticker: string) {
        this.pythonApi.getCedearDollarPrices(ticker).subscribe((data: any) => {
            this.assetDollarData.cclDollar = data.ccl_dollar;
            this.assetDollarData.dateUpdated = data.date_updated;
            this.assetDollarData.cedearPriceBA = data.ba_cedear_price;
            this.assetDollarData.stockPriceUSA = data.us_stock_price;
            this.assetDollarData.ratio = data.ratio;
            this.assetDollarData.cedearDollar = data.cedear_dollar;
            this.assetDollarData.diffRealPrice = data.difference;
            this.isAnalysisDataAvailable = true;
        });
    }

    updateDollarsData() {
        this.isAnalysisDataAvailable = false;
        this.getDollarsData(this.assetIncoming.ticker);
    }

    //#endregion

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
