import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexYAxis,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexNoData,
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonDataService } from 'src/app/services/api/python/python-data.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
};

@Component({
    selector: 'app-candlestick-chart',
    templateUrl: './candlestick-chart.component.html',
    styleUrls: ['./candlestick-chart.component.scss'],
    providers: [DatePipe],
})
export class CandlestickChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    candleChartData: [];
    candleChartTicker: '';
    candleChartName: '';
    isDataAvailable = false;

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
                height: 400,
                animations: {
                    enabled: false,
                    easing: 'linear',
                    speed: 1500,
                    animateGradually: {
                        enabled: false,
                        delay: 0,
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 1500,
                    },
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
            this.aMonthAgoDateToDatePipe(),
            this.todayDateToDatePipe()
        );
    }

    getCandleChartData(
        ticker: string,
        selectedDate: string,
        todayDate: string
    ) {
        this.pythonApi
            .accion(ticker, selectedDate, todayDate)
            .subscribe((data: any) => {
                this.updateSeries(data.data);
                this.candleChartName = data.name;
                this.candleChartTicker = data.ticker;
                this.isDataAvailable = true;
            });
    }

    public updateSeries(dataGET: []) {
        this.chartOptions.series = [
            {
                data: dataGET,
            },
        ];
    }

    aYearAgoDate(date: Date) {
        return date.setFullYear(date.getFullYear() - 1);
    }

    aYearAgoDateToDatePipe() {
        return this.datePipe.transform(
            this.aYearAgoDate(new Date()),
            'yyyy/MM/dd'
        );
    }

    aMonthAgoDate(date: Date) {
        return date.setMonth(date.getMonth() - 1);
    }

    aMonthAgoDateToDatePipe() {
        return this.datePipe.transform(
            this.aMonthAgoDate(new Date()),
            'yyyy/MM/dd'
        );
    }

    aWeekAgoDate(date: Date) {
        return date.setDate(date.getDate() - 7);
    }

    aWeekAgoDateToDatePipe() {
        return this.datePipe.transform(
            this.aWeekAgoDate(new Date()),
            'yyyy/MM/dd'
        );
    }

    todayDateToDatePipe() {
        return this.datePipe.transform(Date.now(), 'yyyy/MM/dd');
    }
}
