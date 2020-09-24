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
import { PythonDataService } from 'src/app/services/api/python/python-data.service';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
}

@Component({
    selector: 'app-candlestick-chart',
    templateUrl: './candlestick-chart.component.html',
    styleUrls: ['./candlestick-chart.component.scss'],
    providers: [DatePipe],
})
export class CandlestickChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    candleChartTicker: '';
    candleChartName: '';
    isDataAvailable = false;
    chartIsCollapsed = true;
    collapseInactive = true;

    //#region datesButtons
    oneYearBtn = false;
    oneMonthBtn = false;
    oneWeekBtn = false;
    //#endregion

    constructor(
        private pythonApi: PythonDataService,
        private datePipe: DatePipe
    ) {
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
    }

    ngOnInit() {
        this.getCandleChartData(
            'MSFT',
            this.dateToDatePipe(this.aMonthAgoDate(new Date()))
        );
    }

    getCandleChartData(ticker: string, selectedDate: string) {
        this.pythonApi
            .accion(ticker, selectedDate, this.todayDateToDatePipe())
            .subscribe((data: any) => {
                this.updateSeries(data.data);
                this.candleChartName = data.name;
                this.candleChartTicker = data.ticker;
                this.isDataAvailable = true;
            });
    }

    updateChartWith(date: Date) {
        this.isDataAvailable = false;
        this.getCandleChartData('MSFT', this.dateToDatePipe(date));
    }

    public updateSeries(dataGET: []) {
        this.chartOptions.series = [
            {
                data: dataGET,
            },
        ];
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
}
